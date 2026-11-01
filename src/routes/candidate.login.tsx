import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/features/auth/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/candidate/login')({ head: () => pageHead('Connexion — espace candidat', 'Connexion — espace candidat — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <LoginPage role="CANDIDATE"/>; }
