import { createFileRoute } from '@tanstack/react-router';
import { OpsDashboard } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/dashboard')({ head: () => pageHead('admin · Vue d’ensemble', 'admin · Vue d’ensemble — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><OpsDashboard kind="admin"/></PortalLayout>; }
