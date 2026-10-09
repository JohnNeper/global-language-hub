import { createFileRoute } from '@tanstack/react-router';
import { ExportsPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/exports')({ head: () => pageHead('Banque · exports', 'CanVerify™ — Banque · exports · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><ExportsPage /></PortalLayout>; }
