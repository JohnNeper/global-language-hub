import { createFileRoute } from '@tanstack/react-router';
import { CasesPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/completed')({ head: () => pageHead('Banque · completed', 'CanVerify™ — Banque · completed · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><CasesPage kind="bank" filter="completed"/></PortalLayout>; }
