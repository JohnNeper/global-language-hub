import { createFileRoute } from '@tanstack/react-router';
import { LettersPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/letters')({ head: () => pageHead('Banque · letters', 'CanVerify™ — Banque · letters · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><LettersPage /></PortalLayout>; }
