import { createFileRoute } from '@tanstack/react-router';
import { ManagementPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/candidates')({ head: () => pageHead('Administration · Candidats', 'Administration · Candidats — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><ManagementPage type="candidates"/></PortalLayout>; }
