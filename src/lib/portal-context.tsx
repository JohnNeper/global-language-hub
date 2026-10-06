import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Session } from '@/types';
const Context = createContext<{ session: Session | null; setSession: (s: Session | null) => void; dark: boolean; setDark: (v: boolean) => void }>({ session: null, setSession: () => {}, dark: false, setDark: () => {} });
export function PortalProvider({ children }: { children: ReactNode }) { const [session, setSession] = useState<Session | null>(null); const [dark, setDarkState] = useState(false); const setDark = (v: boolean) => { setDarkState(v); document.documentElement.classList.toggle('dark', v); }; return <Context.Provider value={{ session, setSession, dark, setDark }}>{children}</Context.Provider>; }
export const usePortal = () => useContext(Context);
