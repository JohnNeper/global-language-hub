import { createFileRoute } from '@tanstack/react-router';
import { ManagementPage } from '@/features/operations/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/institution')({ head: () => pageHead('Établissement bancaire', 'CanVerify™ — Établissement bancaire · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><ManagementPage type="institution"/></PortalLayout>; }
