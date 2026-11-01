import { createFileRoute } from '@tanstack/react-router';
import { ResultPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/result')({ head: () => pageHead('Candidat · Résultat & RVD', 'Candidat · Résultat & RVD — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><ResultPage /></PortalLayout>; }
