import { createFileRoute } from '@tanstack/react-router';
import { RegisterPage } from '@/features/auth/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/candidate/register')({ head: () => pageHead('Inscription candidat', 'CanVerify™ — Inscription candidat · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <RegisterPage />; }
