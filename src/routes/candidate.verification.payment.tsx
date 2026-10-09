import { createFileRoute } from '@tanstack/react-router';
import { PaymentPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/payment')({ head: () => pageHead('Candidat · verification · payment', 'CanVerify™ — Candidat · verification · payment · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><PaymentPage /></PortalLayout>; }
