import { createFileRoute } from '@tanstack/react-router';
import { BillingPage } from '@/features/saas/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/billing')({ head: () => pageHead('Facturation bancaire', 'Facturation bancaire — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><BillingPage scope="bank"/></PortalLayout>; }
