import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/features/auth/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/bank/login')({ head: () => pageHead('Connexion — portail partenaire', 'Connexion — portail partenaire — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <LoginPage role="BANK_AGENT"/>; }
