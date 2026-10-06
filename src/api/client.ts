import type { ApiResponse, PortalData, Session, UserRole, Candidate, VerificationDocument, VerificationStatus, PublicVerification } from '@/types';
import { createMockData } from '@/mocks/data';
export type DemoScenario = 'success' | 'empty' | 'network' | 'server';
let scenario: DemoScenario = 'success';
let data = createMockData();
const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
const mode = import.meta.env.VITE_API_MODE === 'rest' ? 'rest' : 'mock';
export const apiConfig = { mode, baseUrl };
export function setDemoScenario(next: DemoScenario) { scenario = next; }
export class ClientError extends Error { constructor(public code: string, message: string) { super(message); } }
async function request<T>(path: string, mock: () => T, method = 'GET', body?: unknown): Promise<T> {
 const requestId = crypto.randomUUID();
 if (mode === 'rest') {
  if (!baseUrl) throw new ClientError('CONFIG', 'API base URL is missing');
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}${path}`, { method, headers: { 'Content-Type': 'application/json', 'X-Request-ID': requestId, ...(method === 'POST' ? { 'Idempotency-Key': requestId } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  if (!response.ok) throw new ClientError(String(response.status), 'Request failed');
  const result: ApiResponse<T> = await response.json(); return result.data;
 }
 await new Promise(resolve => setTimeout(resolve, 450));
 if (scenario === 'network') throw new ClientError('NETWORK', 'Simulated network error');
 if (scenario === 'server') throw new ClientError('SERVER', 'Simulated server error');
 return structuredClone(mock());
}
export const portalApi = { get: () => request<PortalData>('/portal', () => scenario === 'empty' ? { ...data, cases: [], documents: [], notifications: [], audit: [], rvds: [] } : data) };
export const authApi = {
 login: (role: UserRole, email: string) => request<Session>('/auth/login', () => ({ role, email, name: role === 'CANDIDATE' ? `${data.candidate.firstName} ${data.candidate.lastName}` : role === 'BANK_AGENT' ? 'Camille Martin' : role === 'GFASC_ADMIN' ? 'Sophie Bernard' : 'Agent autorité' }), 'POST', { role, email }),
 register: (profile: Partial<Candidate>) => request<Candidate>('/auth/register', () => { data.candidate = { ...data.candidate, ...profile }; data.step = 0; data.documents = []; data.mandate = { signed: false }; data.payment = { amount: 350, currency: 'CAD', status: 'PENDING' }; data.cases[0] = { ...data.cases[0], candidate: data.candidate, status: 'CREATED' }; return data.candidate; }, 'POST', profile),
 verifyEmail: () => request('/auth/verify-email', () => true, 'POST')
};
export const candidateApi = { update: (profile: Partial<Candidate>) => request('/candidates/me', () => { data.candidate = { ...data.candidate, ...profile }; return data.candidate; }, 'PATCH', profile) };
export const verificationApi = {
 start: () => request('/verifications', () => { data.step = 1; return true; }, 'POST'),
 decide: (id: string, status: VerificationStatus, reason = '') => request('/verifications/' + id, () => { const c = data.cases.find(item => item.id === id); if (c) { c.status = status; c.reason = reason; } data.audit.unshift({ id: crypto.randomUUID(), date: new Date().toISOString(), user: 'agent@demo.gfasc.ca', action: status, entity: id, ip: '192.0.2.10', country: 'CA', status: 'SUCCESS' }); return c; }, 'PATCH', { status, reason }),
 advance: () => request('/verifications/progress', () => { data.step = Math.min(7, data.step + 1); const stages: VerificationStatus[] = ['CREATED', 'DOCUMENTS_VALIDATED', 'MANDATE_SIGNED', 'PAYMENT_CONFIRMED', 'WAITING_BANK', 'BANK_VERIFIED', 'GFASC_REVIEW', 'COMPLETED']; data.cases[0].status = stages[data.step]; return data.step; }, 'POST')
};
export const documentApi = {
 upload: (file: File) => request<VerificationDocument>('/documents', () => { if (file.size > 10 * 1024 * 1024 || !['application/pdf', 'image/jpeg'].includes(file.type)) throw new ClientError('VALIDATION', 'Invalid document'); const doc: VerificationDocument = { id: crypto.randomUUID(), name: file.name, size: file.size, type: file.type, status: 'VALIDATED', date: new Date().toISOString(), ocr: { passportNumber: '••••••DEMO', name: `${data.candidate.firstName} ${data.candidate.lastName}`, dateOfBirth: data.candidate.dateOfBirth, nationality: data.candidate.nationality, confidence: 98.4, simulated: true } }; data.documents.push(doc); data.step = Math.max(data.step, 1); data.cases[0].status = 'DOCUMENTS_VALIDATED'; return doc; }, 'POST', { name: file.name, size: file.size, type: file.type }),
 remove: (id: string) => request('/documents/' + id, () => { data.documents = data.documents.filter(d => d.id !== id); return true; }, 'DELETE')
};
export const bankApi = { select: (id: string) => request('/institutions/select', () => { data.selectedBank = id; data.cases[0].bankId = id; return true; }, 'POST', { id }), list: () => request('/institutions', () => data.banks) };
export const mandateApi = { sign: () => request('/mandates/sign', () => { data.mandate = { signed: true, signedAt: new Date().toISOString(), hash: 'DEMO-83a1…e927' }; data.step = Math.max(2, data.step); return data.mandate; }, 'POST') };
export const paymentApi = { pay: (fail = false) => request('/payments', () => { data.payment.status = fail ? 'FAILED' : 'SUCCESS'; if (!fail) { data.payment.receipt = 'REC-2026-048291'; data.step = 4; data.cases[0].status = 'WAITING_BANK'; } return data.payment; }, 'POST', { amount: 350, currency: 'CAD', fail }) };
export const rvdApi = { issue: (id: string) => request('/rvd', () => { const c = data.cases.find(item => item.id === id); if (!c) throw new ClientError('NOT_FOUND', 'Case not found'); c.status = 'COMPLETED'; const doc = { reference: `RVD-2026-${String(842 + data.rvds.length).padStart(5, '0')}`, candidateId: c.candidate.id, status: 'VALID' as const, issuedAt: '2026-10-06', expiresAt: '2027-10-06', bank: data.banks.find(b => b.id === c.bankId)?.name ?? '', cadBalance: c.cadBalance, hash: 'DEMO-a47c…8f21' }; data.rvds.unshift(doc); return doc; }, 'POST', { id }), revoke: (reference: string) => request('/rvd/' + reference, () => { const rvd = data.rvds.find(r => r.reference === reference); if (rvd) rvd.status = 'REVOKED'; return rvd; }, 'PATCH', { status: 'REVOKED' }) };
export const publicVerificationApi = { lookup: (reference: string) => request<PublicVerification | null>('/public/verify/' + encodeURIComponent(reference), () => { const document = data.rvds.find(r => r.reference.toUpperCase() === reference.trim().toUpperCase()); return document ? { document } : null; }), challenge: (reference: string, suffix: string) => request<PublicVerification>('/public/challenge', () => { const document = data.rvds.find(r => r.reference === reference); if (!document || document.status !== 'VALID' || suffix.toUpperCase() !== 'DEMO') throw new ClientError('CHALLENGE', 'Invalid challenge'); return { document, extended: data.candidate }; }, 'POST', { reference, suffix }) };
export const notificationApi = { read: (id?: string) => request('/notifications/read', () => { data.notifications.forEach(n => { if (!id || n.id === id) n.read = true; }); return true; }, 'POST', { id }) };
export const adminApi = { ...verificationApi };
export const reportingApi = { export: () => request('/reports/export', () => data.cases) };
