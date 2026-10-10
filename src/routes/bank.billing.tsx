import { createFileRoute } from '@tanstack/react-router';
import { BillingPage } from '@/features/saas/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/billing')({ head: () => pageHead('Facturation bancaire', 'CanVerify™ — Facturation bancaire · GFASC Canada. Plateforme SaaS de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><BillingPage scope="bank"/></PortalLayout>; }
