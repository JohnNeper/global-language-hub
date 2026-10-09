import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/features/auth/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/admin/login')({ head: () => pageHead('Connexion admin', 'CanVerify™ — Connexion admin · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <LoginPage role="GFASC_ADMIN"/>; }
