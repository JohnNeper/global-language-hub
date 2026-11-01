import { createFileRoute } from '@tanstack/react-router';
import { CaseDetailPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/verifications/$id')({ head: () => pageHead('admin · Détail du dossier', 'admin · Détail du dossier — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><CaseDetailPage kind="admin" id={Route.useParams().id}/></PortalLayout>; }
