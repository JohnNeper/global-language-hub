import { createFileRoute } from '@tanstack/react-router';
import { CaseDetailPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/verifications/$id')({ head: () => pageHead('admin · Détail du dossier', 'CanVerify™ — admin · Détail du dossier · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><CaseDetailPage kind="admin" id={Route.useParams().id}/></PortalLayout>; }
