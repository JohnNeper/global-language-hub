import { createFileRoute } from '@tanstack/react-router';
import { OpsDashboard } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/dashboard')({ head: () => pageHead('bank · Vue d’ensemble', 'CanVerify™ — bank · Vue d’ensemble · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><OpsDashboard kind="bank"/></PortalLayout>; }
