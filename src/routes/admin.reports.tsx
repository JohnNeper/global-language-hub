import { createFileRoute } from '@tanstack/react-router';
import { AnalyticsPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/reports')({ head: () => pageHead('GFASC · reports', 'CanVerify™ — GFASC · reports · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><AnalyticsPage /></PortalLayout>; }
