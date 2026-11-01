import { createFileRoute } from '@tanstack/react-router';
import { RvdManagementPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/rvd')({ head: () => pageHead('Administration · Documents RVD', 'Administration · rvd — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><RvdManagementPage /></PortalLayout>; }
