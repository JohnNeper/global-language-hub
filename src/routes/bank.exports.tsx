import { createFileRoute } from '@tanstack/react-router';
import { ExportsPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/exports')({ head: () => pageHead('Banque · Exportations', 'Banque · Exportations — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><ExportsPage /></PortalLayout>; }
