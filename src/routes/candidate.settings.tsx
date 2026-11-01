import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/settings')({ head: () => pageHead('Candidat · Paramètres', 'Candidat · Paramètres — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><SettingsPage /></PortalLayout>; }
