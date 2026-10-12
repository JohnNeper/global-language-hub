import { createFileRoute } from '@tanstack/react-router';
import { MandateSignPage } from '@/features/candidate/application';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/mandate')({ head: () => pageHead('Candidat · verification · mandate', 'CanVerify™ — Candidat · verification · mandate · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><MandateSignPage/></PortalLayout>; }
