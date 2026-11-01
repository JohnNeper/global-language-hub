import { createFileRoute } from '@tanstack/react-router';
import { LettersPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/letters')({ head: () => pageHead('Banque · Lettres de confirmation', 'Banque · Lettres de confirmation — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><LettersPage /></PortalLayout>; }
