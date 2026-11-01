import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/how-it-works')({ head: () => pageHead('Le parcours GFASC', 'Le parcours GFASC — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <ContentPage page="how-it-works"/>; }
