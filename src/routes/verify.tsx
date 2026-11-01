import { createFileRoute } from '@tanstack/react-router';
import { PublicVerifyPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/verify')({ head: () => pageHead('Vérifier un document RVD', 'Vérifier un document RVD — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PublicVerifyPage />; }
