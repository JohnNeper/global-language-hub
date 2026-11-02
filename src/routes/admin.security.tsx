import { createFileRoute } from '@tanstack/react-router';
import { SecurityCenterPage } from '@/features/security/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/security')({ head: () => pageHead('Administration · Centre de sécurité', 'Administration · Centre de sécurité — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><SecurityCenterPage kind="admin"/></PortalLayout>; }
