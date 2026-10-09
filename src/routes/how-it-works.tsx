import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/how-it-works')({ head: () => pageHead('Le parcours CanVerify', 'CanVerify™ — Le parcours CanVerify · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <ContentPage page="how-it-works"/>; }
