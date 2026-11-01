import { createFileRoute } from '@tanstack/react-router';
import { MandateSignPage } from '@/features/candidate/application';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/mandate')({ head: () => pageHead('Candidat · Signature du mandat', 'Candidat · Signature du mandat — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><MandateSignPage/></PortalLayout>; }
