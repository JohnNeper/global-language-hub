import { createFileRoute } from '@tanstack/react-router';
import { CandidateDashboard } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/dashboard')({ head: () => pageHead('Candidat · dashboard', 'CanVerify™ — Candidat · dashboard · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><CandidateDashboard /></PortalLayout>; }
