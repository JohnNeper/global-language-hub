import { createFileRoute } from '@tanstack/react-router';
import { ResultPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/rvd/$id')({ head: () => pageHead('Document RVD candidat', 'CanVerify™ — Document RVD candidat · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><ResultPage  id={Route.useParams().id}/></PortalLayout>; }
