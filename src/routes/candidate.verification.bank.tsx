import { createFileRoute } from '@tanstack/react-router';
import { BankSelectionPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/bank')({ head: () => pageHead('Candidat · verification · bank', 'CanVerify™ — Candidat · verification · bank · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><BankSelectionPage /></PortalLayout>; }
