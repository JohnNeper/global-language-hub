import { createFileRoute } from '@tanstack/react-router';
import { CasesPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/verifications/')({ head: () => pageHead('admin · Vérifications', 'CanVerify™ — admin · Vérifications · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><CasesPage kind="admin"/></PortalLayout>; }
