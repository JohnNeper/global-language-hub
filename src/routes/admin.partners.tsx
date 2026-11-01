import { createFileRoute } from '@tanstack/react-router';
import { PartnersPage } from '@/features/saas/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/partners')({ head: () => pageHead('Administration · Partenaires & institutions', 'Administration · Partenaires & institutions — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><PartnersPage/></PortalLayout>; }
