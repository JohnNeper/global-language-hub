import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/about')({ head: () => pageHead('À propos de GFASC', 'GFASC — À propos de GFASC · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <ContentPage page="about"/>; }
