import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/legal/privacy')({ head: () => pageHead('Politique de confidentialité', 'CanVerify™ — Politique de confidentialité · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <ContentPage page="privacy"/>; }
