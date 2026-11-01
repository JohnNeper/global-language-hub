import { createFileRoute } from '@tanstack/react-router';
import { BillingPage } from '@/features/saas/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/billing')({ head: () => pageHead('Administration · Facturation', 'Administration · Facturation — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><BillingPage scope="admin"/></PortalLayout>; }
