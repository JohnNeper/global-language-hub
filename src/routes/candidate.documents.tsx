import { createFileRoute } from '@tanstack/react-router';
import { DocumentsPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/documents')({ head: () => pageHead('Candidat · documents', 'Candidat · documents — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><DocumentsPage /></PortalLayout>; }
