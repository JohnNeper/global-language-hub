import { createFileRoute } from '@tanstack/react-router';
import { AuditPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/audit')({ head: () => pageHead('Administration · Journal d’audit', 'Administration · Journal d’audit — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><AuditPage /></PortalLayout>; }
