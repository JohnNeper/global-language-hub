import { createFileRoute } from '@tanstack/react-router';
import { OpsDashboard } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/dashboard')({ head: () => pageHead('Banque · Vue d’ensemble', 'Banque · Vue d’ensemble — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><OpsDashboard kind="bank"/></PortalLayout>; }
