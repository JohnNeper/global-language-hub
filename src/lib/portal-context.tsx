import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Session } from '@/types';
import { defaultPolicy, deviceLabel, type LoginEvent, type SecurityPolicy } from '@/lib/security';

type EndReason = 'LOGOUT' | 'TIMEOUT';
interface PortalState {
  session: Session | null; setSession: (s: Session | null, reason?: EndReason) => void;
  dark: boolean; setDark: (v: boolean) => void;
  policy: SecurityPolicy; setPolicy: (p: SecurityPolicy) => void;
  history: LoginEvent[]; recordEvent: (e: Omit<LoginEvent, 'id' | 'date' | 'device'>) => void;
  sessionStartedAt: number | null; endedReason: EndReason | null;
}
const Context = createContext<PortalState>({ session: null, setSession: () => {}, dark: false, setDark: () => {}, policy: defaultPolicy, setPolicy: () => {}, history: [], recordEvent: () => {}, sessionStartedAt: null, endedReason: null });

const seed: LoginEvent[] = [
  { id: 's1', date: '2026-10-30T08:12:00Z', role: 'GFASC_ADMIN', email: 'admin@demo.gfasc.ca', device: 'Chrome · Windows', status: 'SUCCESS' },
  { id: 's2', date: '2026-10-29T17:44:00Z', role: 'BANK_AGENT', email: 'bank@demo.gfasc.ca', device: 'Edge · Windows', status: 'FAILED' },
  { id: 's3', date: '2026-10-29T09:03:00Z', role: 'CANDIDATE', email: 'candidate@demo.gfasc.ca', device: 'Safari · iOS', status: 'SUCCESS' },
];

export function PortalProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [dark, setDarkState] = useState(false);
  const [policy, setPolicy] = useState<SecurityPolicy>(defaultPolicy);
  const [history, setHistory] = useState<LoginEvent[]>(seed);
  const [sessionStartedAt, setStarted] = useState<number | null>(null);
  const [endedReason, setEnded] = useState<EndReason | null>(null);
  const recordEvent = useCallback((e: Omit<LoginEvent, 'id' | 'date' | 'device'>) => setHistory(h => [{ ...e, id: crypto.randomUUID(), date: new Date().toISOString(), device: deviceLabel() }, ...h].slice(0, 50)), []);
  const setSession = useCallback((s: Session | null, reason: EndReason = 'LOGOUT') => {
    setSessionState(prev => { if (!s && prev) recordEvent({ role: prev.role, email: prev.email, status: reason }); return s; });
    setStarted(s ? Date.now() : null); setEnded(s ? null : reason);
  }, [recordEvent]);
  const setDark = (v: boolean) => { setDarkState(v); document.documentElement.classList.toggle('dark', v); };
  return <Context.Provider value={{ session, setSession, dark, setDark, policy, setPolicy, history, recordEvent, sessionStartedAt, endedReason }}>{children}</Context.Provider>;
}
export const usePortal = () => useContext(Context);
