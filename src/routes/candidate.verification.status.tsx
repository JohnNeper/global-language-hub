import { createFileRoute } from '@tanstack/react-router';
import { StatusPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/status')({ head: () => pageHead('Candidat · Suivi du dossier', 'Candidat · verification · status — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><StatusPage /></PortalLayout>; }
