import { createFileRoute } from '@tanstack/react-router';
import { CasesPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/completed')({ head: () => pageHead('Banque · Dossiers terminés', 'Banque · Dossiers terminés — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><CasesPage kind="bank" filter="completed"/></PortalLayout>; }
