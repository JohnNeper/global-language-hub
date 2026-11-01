import { createFileRoute } from '@tanstack/react-router';
import { BankSelectionPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/bank')({ head: () => pageHead('Candidat · Choix de la banque', 'Candidat · Choix de la banque — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><BankSelectionPage /></PortalLayout>; }
