import { createFileRoute } from '@tanstack/react-router';
import { ApplicationFormPage } from '@/features/candidate/application';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/documents')({ head: () => pageHead('Candidat · verification · documents', 'CanVerify™ — Candidat · verification · documents · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><ApplicationFormPage/></PortalLayout>; }
