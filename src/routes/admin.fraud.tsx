import { createFileRoute } from '@tanstack/react-router';
import { FraudPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/fraud')({ head: () => pageHead('GFASC · fraud', 'CanVerify™ — GFASC · fraud · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><FraudPage /></PortalLayout>; }
