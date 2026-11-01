// Simulated security rules (frontend demo). Pure functions so they can be unit tested
// and later replaced by a real identity provider.
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_SECONDS = 60;
export const DEFAULT_TIMEOUT_MINUTES = 15;
export const WARNING_SECONDS = 60;

export interface SecurityPolicy { timeoutMinutes: number; otpRequired: boolean; minPasswordLength: number; partnerIpAllowlist: string[]; maxAttempts: number; }
export const defaultPolicy: SecurityPolicy = { timeoutMinutes: DEFAULT_TIMEOUT_MINUTES, otpRequired: true, minPasswordLength: 10, partnerIpAllowlist: ['196.202.0.0/16', '41.202.0.0/16'], maxAttempts: MAX_LOGIN_ATTEMPTS };

export interface LoginEvent { id: string; date: string; role: string; email: string; device: string; status: 'SUCCESS' | 'FAILED' | 'LOCKED' | 'LOGOUT' | 'TIMEOUT'; }

/** Six-digit one-time code, generated with the browser's cryptographic random source. */
export function generateOtp(): string { const a = new Uint32Array(1); crypto.getRandomValues(a); return String((a[0] ?? 0) % 1_000_000).padStart(6, '0'); }

export type PasswordCheck = { length: boolean; upper: boolean; lower: boolean; digit: boolean; symbol: boolean };
export function checkPassword(pw: string, minLength = defaultPolicy.minPasswordLength): PasswordCheck { return { length: pw.length >= minLength, upper: /[A-Z]/.test(pw), lower: /[a-z]/.test(pw), digit: /\d/.test(pw), symbol: /[^A-Za-z0-9]/.test(pw) }; }
export function passwordScore(pw: string, minLength?: number): number { return Object.values(checkPassword(pw, minLength)).filter(Boolean).length; }
export function isStrongPassword(pw: string, minLength?: number): boolean { return passwordScore(pw, minLength) === 5; }

/** Returns the lock end time when attempts reach the limit, otherwise null. */
export function nextLock(failedAttempts: number, now: number, max = MAX_LOGIN_ATTEMPTS): number | null { return failedAttempts >= max ? now + LOCKOUT_SECONDS * 1000 : null; }

export function maskAccount(value: string): string { const v = value.replace(/\s/g, ''); return v.length <= 4 ? v : '•'.repeat(v.length - 4) + v.slice(-4); }
export function maskEmail(email: string): string { const [u = '', d = ''] = email.split('@'); return `${u.slice(0, 2)}${'•'.repeat(Math.max(1, u.length - 2))}@${d}`; }

export function deviceLabel(): string { if (typeof navigator === 'undefined') return 'Navigateur'; const ua = navigator.userAgent; const os = /Windows/.test(ua) ? 'Windows' : /Mac OS/.test(ua) ? 'macOS' : /Android/.test(ua) ? 'Android' : /iPhone|iPad/.test(ua) ? 'iOS' : /Linux/.test(ua) ? 'Linux' : 'Appareil'; const br = /Edg\//.test(ua) ? 'Edge' : /Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Navigateur'; return `${br} · ${os}`; }

export function formatCountdown(seconds: number): string { const s = Math.max(0, Math.floor(seconds)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }

/** Permission matrix shown in the super-admin security centre. */
export const permissions = [
  { key: 'viewOwnFile', fr: 'Consulter son propre dossier', en: 'View own file', roles: ['CANDIDATE'] },
  { key: 'signMandate', fr: 'Signer le mandat', en: 'Sign mandate', roles: ['CANDIDATE'] },
  { key: 'viewAssigned', fr: 'Consulter les dossiers assignés', en: 'View assigned files', roles: ['BANK_AGENT', 'GFASC_ADMIN'] },
  { key: 'confirmBalance', fr: 'Confirmer un solde / émettre une BCL', en: 'Confirm balance / issue BCL', roles: ['BANK_AGENT'] },
  { key: 'issueRvd', fr: 'Émettre ou révoquer un RVD', en: 'Issue or revoke RVD', roles: ['GFASC_ADMIN'] },
  { key: 'managePartners', fr: 'Gérer les partenaires', en: 'Manage partners', roles: ['GFASC_ADMIN'] },
  { key: 'auditLog', fr: 'Consulter le journal d’audit', en: 'View audit log', roles: ['GFASC_ADMIN'] },
  { key: 'policies', fr: 'Modifier les politiques de sécurité', en: 'Edit security policies', roles: ['GFASC_ADMIN'] },
] as const;
