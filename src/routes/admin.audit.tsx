import { createFileRoute } from '@tanstack/react-router';
import { AuditPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/audit')({ head: () => pageHead('GFASC · audit', 'CanVerify™ — GFASC · audit · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><AuditPage /></PortalLayout>; }
