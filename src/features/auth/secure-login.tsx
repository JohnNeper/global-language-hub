import { useEffect, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, ArrowLeft, Eye, EyeOff, KeyRound, LockKeyhole, ShieldCheck, Smartphone, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { authApi } from '@/api/client';
import { usePortal } from '@/lib/portal-context';
import { useLocale } from '@/i18n';
import { Busy } from '@/components/canverify/ui';
import { generateOtp, maskEmail, nextLock, formatCountdown } from '@/lib/security';
import type { UserRole } from '@/types';

const roleMeta: Record<UserRole, { key: 'candidate' | 'bank' | 'admin' | 'authority'; path: string }> = {
  CANDIDATE: { key: 'candidate', path: '/candidate/dashboard' }, BANK_AGENT: { key: 'bank', path: '/bank/dashboard' }, GFASC_ADMIN: { key: 'admin', path: '/admin/dashboard' }, PUBLIC_AUTHORITY: { key: 'authority', path: '/verify' },
};

export function SecureLogin({ role = 'CANDIDATE', returnTo, Layout }: { role?: UserRole; returnTo?: string; Layout: (p: { children: React.ReactNode }) => React.ReactElement }) {
  const { t, locale } = useLocale(); const T = (fr: string, en: string) => (locale === 'fr' ? fr : en);
  const { setSession, recordEvent, policy, endedReason } = usePortal(); const navigate = useNavigate();
  const [selectedRole, setRole] = useState<UserRole>(role); const meta = roleMeta[selectedRole];
  const [email, setEmail] = useState(`${meta.key}@demo.gfasc.ca`); const [password, setPassword] = useState('Demo-GFASC-2026'); const [show, setShow] = useState(false);
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials'); const [otp, setOtp] = useState(''); const [code, setCode] = useState(''); const [attempts, setAttempts] = useState(0); const [lockedUntil, setLocked] = useState<number | null>(null); const [now, setNow] = useState(Date.now()); const [error, setError] = useState('');
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const locked = lockedUntil !== null && lockedUntil > now;
  useEffect(() => { if (lockedUntil && lockedUntil <= now) { setLocked(null); setAttempts(0); } }, [now, lockedUntil]);
  const fail = (msg: string) => { const n = attempts + 1; setAttempts(n); setError(msg); recordEvent({ role: selectedRole, email, status: 'FAILED' }); const until = nextLock(n, Date.now(), policy.maxAttempts); if (until) { setLocked(until); recordEvent({ role: selectedRole, email, status: 'LOCKED' }); } };
  const finish = useMutation({ mutationFn: () => authApi.login(selectedRole, email), onSuccess: session => { recordEvent({ role: selectedRole, email, status: 'SUCCESS' }); setSession(session); navigate({ to: returnTo && selectedRole === role ? returnTo : meta.path }); } });
  const submitCredentials = (e: React.FormEvent) => { e.preventDefault(); setError(''); if (locked) return; if (password.length < 8) { fail(T('Identifiants invalides.', 'Invalid credentials.')); return; } if (!policy.otpRequired && selectedRole === 'CANDIDATE') { finish.mutate(); return; } setCode(generateOtp()); setOtp(''); setStep('otp'); };
  const submitOtp = (e: React.FormEvent) => { e.preventDefault(); setError(''); if (locked) return; if (otp !== code) { fail(T('Code incorrect.', 'Incorrect code.')); return; } finish.mutate(); };
  const remaining = Math.max(0, policy.maxAttempts - attempts);
  return <Layout>
    <div className="eyebrow">{t(meta.key)}</div>
    <h1>{step === 'credentials' ? T('Connexion sécurisée', 'Secure sign-in') : T('Vérification en deux étapes', 'Two-step verification')}</h1>
    <p className="auth-sub">{step === 'credentials' ? T('Accédez à votre espace GFASC protégé.', 'Access your protected GFASC workspace.') : T(`Saisissez le code à 6 chiffres envoyé à ${maskEmail(email)}.`, `Enter the 6-digit code sent to ${maskEmail(email)}.`)}</p>
    {endedReason === 'TIMEOUT' && step === 'credentials' && <div className="notice mb-4"><Clock size={15} />{T('Votre session a expiré après une période d’inactivité. Reconnectez-vous.', 'Your session expired after inactivity. Please sign in again.')}</div>}
    <div className="login-steps"><span className={step === 'credentials' ? 'active' : 'done'}><KeyRound size={13} />{T('Identifiants', 'Credentials')}</span><span className={step === 'otp' ? 'active' : ''}><Smartphone size={13} />{T('Code à usage unique', 'One-time code')}</span></div>
    {step === 'credentials' && <div className="auth-role-tabs" role="tablist">{(['CANDIDATE', 'BANK_AGENT', 'GFASC_ADMIN'] as UserRole[]).map(r => <Button key={r} type="button" role="tab" aria-selected={r === selectedRole} variant="ghost" className={r === selectedRole ? 'selected' : ''} onClick={() => { setRole(r); setEmail(`${roleMeta[r].key}@demo.gfasc.ca`); setError(''); }}>{t(roleMeta[r].key)}</Button>)}</div>}
    {locked && <div className="error-box" role="alert"><LockKeyhole size={16} />{T(`Trop de tentatives. Accès verrouillé pendant ${formatCountdown(((lockedUntil ?? now) - now) / 1000)}.`, `Too many attempts. Access locked for ${formatCountdown(((lockedUntil ?? now) - now) / 1000)}.`)}</div>}
    {step === 'credentials' ? <form className="auth-form" onSubmit={submitCredentials}>
      <label className="form-field">{t('email')}<input type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="username" maxLength={255} disabled={locked} /></label>
      <label className="form-field">{t('password')}<span className="password-wrap"><input type={show ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" maxLength={128} disabled={locked} /><button type="button" className="password-toggle" aria-label={show ? T('Masquer', 'Hide') : T('Afficher', 'Show')} onClick={() => setShow(!show)}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>
      {error && !locked && <p className="error-message" role="alert">{error} {T(`Tentatives restantes : ${remaining}`, `Attempts left: ${remaining}`)}</p>}
      <Button type="submit" disabled={locked}>{T('Continuer', 'Continue')}<ArrowRight /></Button>
    </form> : <form className="auth-form" onSubmit={submitOtp}>
      <div className="otp-demo"><Info size={14} />{T('Démonstration — votre code : ', 'Demo — your code: ')}<strong className="mono">{code}</strong></div>
      <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={locked} autoFocus><InputOTPGroup>{[0, 1, 2, 3, 4, 5].map(i => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup></InputOTP>
      {error && !locked && <p className="error-message" role="alert">{error} {T(`Tentatives restantes : ${remaining}`, `Attempts left: ${remaining}`)}</p>}
      <Button type="submit" disabled={otp.length !== 6 || locked || finish.isPending}><Busy busy={finish.isPending}><ShieldCheck />{T('Vérifier et se connecter', 'Verify and sign in')}</Busy></Button>
      <div className="flex justify-between text-xs"><button type="button" className="link-btn" onClick={() => { setStep('credentials'); setError(''); }}><ArrowLeft size={12} className="inline" /> {T('Retour', 'Back')}</button><button type="button" className="link-btn" onClick={() => { setCode(generateOtp()); setOtp(''); }}>{T('Renvoyer un code', 'Resend code')}</button></div>
    </form>}
    <div className="auth-security-note"><LockKeyhole size={14} /><span>{T(`Connexion chiffrée · verrouillage après ${policy.maxAttempts} échecs · déconnexion automatique après ${policy.timeoutMinutes} min d’inactivité.`, `Encrypted connection · lock after ${policy.maxAttempts} failures · automatic sign-out after ${policy.timeoutMinutes} min of inactivity.`)}</span></div>
    <div className="notice mt-3"><Info size={15} />{t('demoNote')}</div>
    {selectedRole === 'CANDIDATE' && <p className="auth-bottom">{t('noAccount')} <Link to="/candidate/register">{t('register')}</Link></p>}
  </Layout>;
}
