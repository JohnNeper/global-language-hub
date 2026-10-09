import { createFileRoute } from '@tanstack/react-router';
import { VerifyEmailPage } from '@/features/auth/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/candidate/verify-email')({ head: () => pageHead('Confirmer votre adresse e-mail', 'CanVerify™ — Confirmer votre adresse e-mail · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <VerifyEmailPage />; }
