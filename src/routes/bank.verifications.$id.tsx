import { createFileRoute } from '@tanstack/react-router';
import { CaseDetailPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/verifications/$id')({ head: () => pageHead('bank · Détail du dossier', 'bank · Détail du dossier — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><CaseDetailPage kind="bank" id={Route.useParams().id}/></PortalLayout>; }
