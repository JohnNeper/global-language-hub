import { createFileRoute } from '@tanstack/react-router';
import { NewVerificationPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/new')({ head: () => pageHead('Candidat · Nouvelle vérification', 'Candidat · verification · new — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><NewVerificationPage /></PortalLayout>; }
