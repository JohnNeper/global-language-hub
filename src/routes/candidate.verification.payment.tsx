import { createFileRoute } from '@tanstack/react-router';
import { PaymentPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/verification/payment')({ head: () => pageHead('Candidat · Paiement', 'Candidat · verification · payment — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><PaymentPage /></PortalLayout>; }
