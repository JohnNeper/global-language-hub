import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/contact')({ head: () => pageHead('Contacter CanVerify', 'CanVerify™ — Contacter CanVerify · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <ContentPage page="contact"/>; }
