import { createFileRoute } from '@tanstack/react-router';
import { ProfilePage } from '@/features/auth/pages';
import { pageHead } from '@/lib/head';
import { PortalLayout } from '@/layouts/portal';
export const Route = createFileRoute('/candidate/profile')({ head: () => pageHead('Profil candidat', 'Profil candidat — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <PortalLayout kind="candidate"><ProfilePage /></PortalLayout>; }
