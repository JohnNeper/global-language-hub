import { createFileRoute } from '@tanstack/react-router';
import { PublicVerifyPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/verify')({ head: () => pageHead('Vérifier un document RVD', 'CanVerify™ — Vérifier un document RVD · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PublicVerifyPage />; }
