import { createFileRoute } from '@tanstack/react-router';
import { AnalyticsPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/analytics')({ head: () => pageHead('Banque · analytics', 'CanVerify™ — Banque · analytics · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><AnalyticsPage /></PortalLayout>; }
