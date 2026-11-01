import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/contact')({ head: () => pageHead('Contacter GFASC', 'Contacter GFASC — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <ContentPage page="contact"/>; }
