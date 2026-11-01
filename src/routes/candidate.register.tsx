import { createFileRoute } from '@tanstack/react-router';
import { RegisterPage } from '@/features/auth/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/candidate/register')({ head: () => pageHead('Inscription candidat', 'Inscription candidat — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <RegisterPage />; }
