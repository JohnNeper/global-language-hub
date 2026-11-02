import { createFileRoute } from '@tanstack/react-router';
import { SecurityCenterPage } from '@/features/security/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/security')({ head: () => pageHead('Candidat · Sécurité du compte', 'Candidat · Sécurité du compte — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><SecurityCenterPage kind="candidate"/></PortalLayout>; }
