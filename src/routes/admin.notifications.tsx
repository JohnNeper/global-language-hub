import { createFileRoute } from '@tanstack/react-router';
import { NotificationsPage } from '@/features/candidate/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/admin/notifications')({ head: () => pageHead('Notifications GFASC', 'CanVerify™ — Notifications GFASC · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="admin"><NotificationsPage /></PortalLayout>; }
