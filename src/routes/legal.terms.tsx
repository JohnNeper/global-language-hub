import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/legal/terms')({ head: () => pageHead('Conditions d’utilisation', 'Conditions d’utilisation — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <ContentPage page="terms"/>; }
