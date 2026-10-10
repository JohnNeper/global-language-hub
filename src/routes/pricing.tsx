import { createFileRoute } from '@tanstack/react-router';
import { PricingPage } from '@/features/public/pages';
import { pageHead } from '@/lib/head';
export const Route = createFileRoute('/pricing')({ head: () => pageHead('Tarifs & abonnements', 'CanVerify™ — tarifs candidats et abonnements SaaS pour institutions partenaires GFASC.'), component: PricingPage });
