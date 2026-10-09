import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/')({ head: () => pageHead('Vérification financière pour le Canada', 'CanVerify™ — Vérification financière pour le Canada · GFASC Canada. Interface de démonstration de vérification financière.'), component: Page });
function Page() { return <HomePage />; }
