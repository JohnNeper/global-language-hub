import { createFileRoute } from '@tanstack/react-router';
import { CaseDetailPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/verifications/$id')({ head: () => pageHead('bank · Détail du dossier', 'CanVerify™ — bank · Détail du dossier · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><CaseDetailPage kind="bank" id={Route.useParams().id}/></PortalLayout>; }
