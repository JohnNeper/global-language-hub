import { createFileRoute } from '@tanstack/react-router';
import { CasesPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/rejected')({ head: () => pageHead('Banque · Dossiers rejetés', 'Banque · Dossiers rejetés — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><CasesPage kind="bank" filter="rejected"/></PortalLayout>; }
