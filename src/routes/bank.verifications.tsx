import { createFileRoute, Outlet } from '@tanstack/react-router';
export const Route = createFileRoute('/bank/verifications')({ component: () => <Outlet /> });
