import { createFileRoute } from '@tanstack/react-router';
import { CandidateDashboard } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/dashboard')({ head: () => pageHead('Candidat · Tableau de bord', 'Candidat · Tableau de bord — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><CandidateDashboard /></PortalLayout>; }
