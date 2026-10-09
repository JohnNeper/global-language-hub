import { createFileRoute } from '@tanstack/react-router';
import { ManagementPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/users')({ head: () => pageHead('GFASC · users', 'CanVerify™ — GFASC · users · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><ManagementPage type="users"/></PortalLayout>; }
