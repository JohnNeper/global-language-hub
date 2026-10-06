import { queryOptions, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portalApi } from './client';
export const portalQuery = queryOptions({ queryKey: ['portal'], queryFn: portalApi.get, staleTime: 30000, retry: 1 });
export function usePortalData() { return useQuery(portalQuery); }
export function useAction<T>(fn: (input: T) => Promise<unknown>) { const client = useQueryClient(); return useMutation({ mutationFn: fn, onSuccess: () => client.invalidateQueries({ queryKey: ['portal'] }) }); }
