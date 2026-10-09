import { createFileRoute } from '@tanstack/react-router';
import { RvdManagementPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/rvd')({ head: () => pageHead('GFASC · rvd', 'CanVerify™ — GFASC · rvd · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><RvdManagementPage /></PortalLayout>; }
