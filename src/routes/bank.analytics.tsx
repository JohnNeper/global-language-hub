import { createFileRoute } from '@tanstack/react-router';
import { AnalyticsPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/analytics')({ head: () => pageHead('Banque · Analyses', 'Banque · Analyses — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><AnalyticsPage /></PortalLayout>; }
