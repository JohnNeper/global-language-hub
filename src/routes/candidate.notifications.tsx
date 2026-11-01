import { createFileRoute } from '@tanstack/react-router';
import { NotificationsPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/notifications')({ head: () => pageHead('Candidat · Notifications', 'Candidat · Notifications — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><NotificationsPage /></PortalLayout>; }
