import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/features/auth/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/bank/login')({ head: () => pageHead('Connexion bank', 'CanVerify™ — Connexion bank · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <LoginPage role="BANK_AGENT"/>; }
