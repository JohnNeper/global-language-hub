import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/features/auth/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/admin/login')({ head: () => pageHead('Connexion — administration GFASC', 'Connexion — administration GFASC — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <LoginPage role="GFASC_ADMIN"/>; }
