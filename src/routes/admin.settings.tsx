import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/settings')({ head: () => pageHead('admin · Paramètres', 'CanVerify™ — admin · Paramètres · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><SettingsPage /></PortalLayout>; }
