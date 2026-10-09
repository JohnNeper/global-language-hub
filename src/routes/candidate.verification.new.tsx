import { createFileRoute } from '@tanstack/react-router';
import { NewVerificationPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/new')({ head: () => pageHead('Candidat · verification · new', 'CanVerify™ — Candidat · verification · new · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><NewVerificationPage /></PortalLayout>; }
