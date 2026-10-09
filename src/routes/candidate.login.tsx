import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/features/auth/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/candidate/login')({ head: () => pageHead('Connexion candidate', 'CanVerify™ — Connexion candidate · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <LoginPage role="CANDIDATE"/>; }
