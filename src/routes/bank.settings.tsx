import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/bank/settings')({ head: () => pageHead('bank · Paramètres', 'CanVerify™ — bank · Paramètres · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="bank"><SettingsPage /></PortalLayout>; }
