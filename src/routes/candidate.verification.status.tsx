import { createFileRoute } from '@tanstack/react-router';
import { StatusPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/status')({ head: () => pageHead('Candidat · verification · status', 'CanVerify™ — Candidat · verification · status · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><StatusPage /></PortalLayout>; }
