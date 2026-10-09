import { createFileRoute } from '@tanstack/react-router';
import { DocumentsPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/documents')({ head: () => pageHead('Candidat · documents', 'CanVerify™ — Candidat · documents · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><DocumentsPage /></PortalLayout>; }
