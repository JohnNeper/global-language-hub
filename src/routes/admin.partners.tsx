import { createFileRoute } from '@tanstack/react-router';
import { PartnersPage } from '@/features/saas/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/partners')({ head: () => pageHead('GFASC · partenaires', 'CanVerify™ — GFASC · partenaires · GFASC Canada. Plateforme SaaS de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><PartnersPage/></PortalLayout>; }
