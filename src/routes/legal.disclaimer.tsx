import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/legal/disclaimer')({ head: () => pageHead('Avis de non-responsabilité', 'CanVerify™ — Avis de non-responsabilité · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <ContentPage page="disclaimer"/>; }
