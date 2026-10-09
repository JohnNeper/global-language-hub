import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/legal/terms')({ head: () => pageHead('Conditions d’utilisation', 'CanVerify™ — Conditions d’utilisation · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <ContentPage page="terms"/>; }
