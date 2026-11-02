import { createFileRoute } from '@tanstack/react-router';
import { SecurityCenterPage } from '@/features/security/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/security')({ head: () => pageHead('Banque · Sécurité du compte', 'Banque · Sécurité du compte — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><SecurityCenterPage kind="bank"/></PortalLayout>; }
