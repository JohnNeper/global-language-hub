import { createFileRoute } from '@tanstack/react-router';
import { PricingPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/pricing')({ head: () => pageHead('Tarifs & abonnements', 'Tarifs & abonnements — GFASC, Global Financial Authentication Services Canada : plateforme sécurisée de vérification financière.'), component: PricingPage });
