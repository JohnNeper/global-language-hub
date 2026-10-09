import { createFileRoute } from '@tanstack/react-router';
import { ProfilePage } from '@/features/auth/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/onboarding')({ head: () => pageHead('Informations personnelles', 'CanVerify™ — Informations personnelles · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><ProfilePage onboarding/></PortalLayout>; }
