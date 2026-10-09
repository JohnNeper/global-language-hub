import { createFileRoute } from '@tanstack/react-router';
import { ContentPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/security')({ head: () => pageHead('Sécurité et confidentialité', 'CanVerify™ — Sécurité et confidentialité · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <ContentPage page="security"/>; }
