import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/faq')({ head: () => pageHead('Questions fréquentes', 'Questions fréquentes — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: Page });
function Page() { return <ContentPage page="faq"/>; }
