export type UserRole = 'CANDIDATE' | 'BANK_AGENT' | 'GFASC_ADMIN' | 'PUBLIC_AUTHORITY';
export type VerificationStatus = 'CREATED' | 'DOCUMENTS_VALIDATED' | 'MANDATE_SIGNED' | 'PAYMENT_CONFIRMED' | 'WAITING_BANK' | 'BANK_VERIFIED' | 'GFASC_REVIEW' | 'COMPLETED' | 'REJECTED' | 'SUSPENDED';
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';
export type DocumentStatus = 'PENDING' | 'VALIDATED' | 'REJECTED';
export type RVDStatus = 'GENERATING' | 'SEALED' | 'VALID' | 'EXPIRED' | 'REVOKED';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export interface ApiError { code: string; message: string; requestId?: string; fields?: Record<string, string>; }
export interface ApiResponse<T> { data: T; requestId: string; }
export interface PaginatedResponse<T> { data: T[]; total: number; page: number; pageSize: number; }
export interface CursorPagination { cursor?: string; nextCursor?: string; limit: number; }
export interface Candidate { id: string; reference: string; firstName: string; lastName: string; email: string; dateOfBirth: string; nationality: string; residence: string; passportSuffix: string; }
export interface Session { role: UserRole; name: string; email: string; }
export interface OCRResult { passportNumber: string; name: string; dateOfBirth: string; nationality: string; confidence: number; simulated: true; }
export interface VerificationDocument { id: string; name: string; size: number; type: string; status: DocumentStatus; date: string; ocr?: OCRResult; }
export interface BankInstitution { id: string; name: string; initials: string; country: string; currencies: string[]; accountTypes: string[]; status: 'ACTIVE' | 'INACTIVE' | 'PENDING'; partnerType?: PartnerType; contact?: string; plan?: PlanId; since?: string; }
export type PartnerType = 'BANK' | 'MICROFINANCE' | 'UNIVERSITY' | 'EMBASSY' | 'INSURER';
export type PlanId = 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
export interface Invoice { id: string; partnerId: string; label: string; amount: number; currency: 'CAD'; issuedAt: string; dueAt: string; status: 'PAID' | 'DUE' | 'OVERDUE'; }
export interface Mandate { signed: boolean; signedAt?: string; hash?: string; signature?: string; }
export interface PersonIdentity { lastName: string; firstName: string; photo?: string | undefined; }
export interface ApplicationForm { caseNumber: string; holder: 'SELF' | 'SPONSOR'; applicant: PersonIdentity & { dateOfBirth: string; passportNumber: string }; applicationType: string; school: string; sponsor?: undefined | PersonIdentity & { relation: string; email: string; address: string }; bankId: string; bankName: string; accountNumber: string; fundSource: string; submittedAt: string; }
export interface Payment { amount: number; currency: 'CAD'; status: PaymentStatus; receipt?: string; }
export interface BankVerification { accountToken: string; localBalance: number; currency: string; method: string; confirmed: boolean; }
export interface CurrencyConversion { rate: number; cadBalance: number; date: string; }
export interface BankConfirmationLetter { reference: string; signed: boolean; hash: string; issuedAt: string; }
export interface GFASCReview { status: 'PENDING' | 'APPROVED' | 'REJECTED'; note: string; }
export interface FraudAssessment { risk: RiskLevel; score: number; indicators: string[]; }
export interface RVD { reference: string; candidateId: string; status: RVDStatus; issuedAt: string; expiresAt: string; bank: string; cadBalance: number; hash: string; }
export interface VerificationCase { id: string; reference: string; candidate: Candidate; status: VerificationStatus; bankId: string; submittedAt: string; risk: RiskLevel; cadBalance: number; localBalance: number; currency: string; rate: number; reason?: string; }
export interface AuditLog { id: string; date: string; user: string; action: string; entity: string; ip: string; country: string; status: string; }
export interface Notification { id: string; titleKey: string; bodyKey: string; date: string; read: boolean; channel: 'EMAIL' | 'IN_APP' | 'SMS'; status: 'SENT' | 'PENDING' | 'FAILED'; }
export interface PublicVerification { document: RVD; extended?: Candidate; }
export interface PortalData { candidate: Candidate; cases: VerificationCase[]; banks: BankInstitution[]; documents: VerificationDocument[]; notifications: Notification[]; audit: AuditLog[]; rvds: RVD[]; mandate: Mandate; payment: Payment; selectedBank: string; step: number; application?: ApplicationForm; }
