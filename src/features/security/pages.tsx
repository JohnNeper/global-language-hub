import { useState } from 'react';
import { toast } from 'sonner';
import { ShieldCheck, Smartphone, Monitor, KeyRound, LockKeyhole, Clock, Globe, Check, X, Plus, Trash2, Activity, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { PageHeader, Panel, formatDate } from '@/components/canverify/ui';
import { useLocale } from '@/i18n';
import { usePortal } from '@/lib/portal-context';
import { checkPassword, deviceLabel, isStrongPassword, maskEmail, passwordScore, permissions } from '@/lib/security';
import type { UserRole } from '@/types';

type Kind = 'candidate' | 'bank' | 'admin';
const roleOf: Record<Kind, UserRole> = { candidate: 'CANDIDATE', bank: 'BANK_AGENT', admin: 'GFASC_ADMIN' };

export function SecurityCenterPage({ kind }: { kind: Kind }) {
  const { locale } = useLocale(); const T = (fr: string, en: string) => (locale === 'fr' ? fr : en);
  const { session, history, policy, setPolicy, recordEvent, sessionStartedAt } = usePortal();
  const [otherSessions, setOther] = useState([{ id: 'o1', device: 'Safari · iOS', place: 'Douala, CM', last: '2026-10-30T19:20:00Z' }]);
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [newIp, setNewIp] = useState('');
  const mine = history.filter(h => kind === 'admin' || h.role === roleOf[kind]);
  const score = passwordScore(pw.next, policy.minPasswordLength); const checks = checkPassword(pw.next, policy.minPasswordLength);
  const canSave = pw.current.length >= 8 && isStrongPassword(pw.next, policy.minPasswordLength) && pw.next === pw.confirm && pw.next !== pw.current;
  const events = mine.slice(0, 8);
  const statusLabel: Record<string, string> = { SUCCESS: T('Connexion réussie', 'Signed in'), FAILED: T('Échec', 'Failed'), LOCKED: T('Verrouillé', 'Locked'), LOGOUT: T('Déconnexion', 'Signed out'), TIMEOUT: T('Expiration', 'Timed out') };
  const score100 = Math.round(((policy.otpRequired ? 1 : 0) + (policy.timeoutMinutes <= 15 ? 1 : 0) + (policy.minPasswordLength >= 10 ? 1 : 0) + (policy.maxAttempts <= 5 ? 1 : 0) + (policy.partnerIpAllowlist.length > 0 ? 1 : 0)) / 5 * 100);
  return <>
    <PageHeader eyebrow={T('Sécurité', 'Security')} title={kind === 'admin' ? T('Centre de sécurité de la plateforme', 'Platform security centre') : T('Sécurité du compte', 'Account security')} subtitle={kind === 'admin' ? T('Politiques d’accès, rôles, sessions et événements de sécurité de GFASC.', 'GFASC access policies, roles, sessions and security events.') : T('Contrôlez vos accès, vos appareils et votre mot de passe.', 'Control your access, devices and password.')} />
    <div className="metric-grid">
      <div className="metric-card sec-metric"><span><ShieldCheck size={14} />{T('Vérification en deux étapes', 'Two-step verification')}</span><strong className="text-success">{T('Active', 'On')}</strong></div>
      <div className="metric-card sec-metric"><span><Clock size={14} />{T('Expiration de session', 'Session timeout')}</span><strong>{policy.timeoutMinutes} min</strong></div>
      <div className="metric-card sec-metric"><span><Activity size={14} />{T('Connexion actuelle', 'Current sign-in')}</span><strong>{sessionStartedAt ? new Date(sessionStartedAt).toLocaleTimeString(locale === 'fr' ? 'fr-CA' : 'en-CA', { hour: '2-digit', minute: '2-digit' }) : '—'}</strong></div>
      {kind === 'admin' ? <div className="metric-card sec-metric"><span><Fingerprint size={14} />{T('Indice de sécurité', 'Security score')}</span><strong>{score100} / 100</strong></div> : <div className="metric-card sec-metric"><span><LockKeyhole size={14} />{T('Identifiant', 'Identifier')}</span><strong className="text-base">{maskEmail(session?.email ?? '')}</strong></div>}
    </div>
    <div className="sec-grid">
      <Panel title={T('Sessions actives', 'Active sessions')} sub={T('Révoquez tout appareil que vous ne reconnaissez pas.', 'Revoke any device you do not recognise.')}><div className="panel-body sec-list">
        <div className="sec-row"><Monitor size={18} /><div><strong>{deviceLabel()}</strong><small>{T('Cet appareil · session en cours', 'This device · current session')}</small></div><span className="bill-badge paid">{T('Actuelle', 'Current')}</span></div>
        {otherSessions.map(s => <div className="sec-row" key={s.id}><Smartphone size={18} /><div><strong>{s.device}</strong><small>{s.place} · {formatDate(s.last, locale)}</small></div><Button size="sm" variant="outline" onClick={() => { setOther(o => o.filter(x => x.id !== s.id)); recordEvent({ role: roleOf[kind], email: session?.email ?? '', status: 'LOGOUT' }); toast.success(T('Session révoquée', 'Session revoked')); }}>{T('Révoquer', 'Revoke')}</Button></div>)}
        {otherSessions.length === 0 && <p className="text-sm text-muted-foreground">{T('Aucune autre session ouverte.', 'No other open session.')}</p>}
      </div></Panel>
      <Panel title={T('Changer le mot de passe', 'Change password')}><form className="panel-body" onSubmit={e => { e.preventDefault(); if (!canSave) return; setPw({ current: '', next: '', confirm: '' }); toast.success(T('Mot de passe mis à jour (simulation)', 'Password updated (simulated)')); }}>
        <div className="form-grid"><label className="form-field full">{T('Mot de passe actuel', 'Current password')}<input type="password" autoComplete="current-password" maxLength={128} value={pw.current} onChange={e => setPw({ ...pw, current: e.target.value })} /></label>
          <label className="form-field">{T('Nouveau mot de passe', 'New password')}<input type="password" autoComplete="new-password" maxLength={128} value={pw.next} onChange={e => setPw({ ...pw, next: e.target.value })} /></label>
          <label className="form-field">{T('Confirmer', 'Confirm')}<input type="password" autoComplete="new-password" maxLength={128} value={pw.confirm} onChange={e => setPw({ ...pw, confirm: e.target.value })} /></label></div>
        <div className="pw-meter" aria-hidden><div style={{ width: `${score * 20}%` }} data-score={score} /></div>
        <ul className="pw-rules">{([['length', T(`${policy.minPasswordLength} caractères minimum`, `At least ${policy.minPasswordLength} characters`)], ['upper', T('Une majuscule', 'One uppercase')], ['lower', T('Une minuscule', 'One lowercase')], ['digit', T('Un chiffre', 'One digit')], ['symbol', T('Un symbole', 'One symbol')]] as const).map(([k, l]) => <li key={k} className={checks[k] ? 'ok' : ''}>{checks[k] ? <Check size={12} /> : <X size={12} />}{l}</li>)}</ul>
        {pw.confirm && pw.next !== pw.confirm && <p className="error-message">{T('Les mots de passe ne correspondent pas.', 'Passwords do not match.')}</p>}
        <div className="form-actions"><Button disabled={!canSave}><KeyRound />{T('Mettre à jour', 'Update')}</Button></div>
      </form></Panel>
    </div>
    {kind === 'admin' && <>
      <Panel title={T('Politiques de sécurité', 'Security policies')} sub={T('S’appliquent immédiatement à tous les portails.', 'Apply immediately to all portals.')}><div className="panel-body policy-grid">
        <label className="policy-row"><div><strong>{T('Code à usage unique obligatoire', 'Mandatory one-time code')}</strong><small>{T('Exigé pour les partenaires et l’administration ; facultatif pour les candidats si désactivé.', 'Always required for partners and admins; optional for candidates when off.')}</small></div><Switch checked={policy.otpRequired} onCheckedChange={v => setPolicy({ ...policy, otpRequired: v })} /></label>
        <label className="policy-row"><div><strong>{T('Déconnexion après inactivité', 'Sign-out after inactivity')}</strong><small>{T('Durée avant fermeture automatique de la session.', 'Time before the session closes automatically.')}</small></div><select className="w-auto" value={policy.timeoutMinutes} onChange={e => setPolicy({ ...policy, timeoutMinutes: Number(e.target.value) })}>{[5, 10, 15, 30].map(m => <option key={m} value={m}>{m} min</option>)}</select></label>
        <label className="policy-row"><div><strong>{T('Tentatives avant verrouillage', 'Attempts before lockout')}</strong><small>{T('Verrouillage temporaire de 60 secondes.', '60-second temporary lock.')}</small></div><select className="w-auto" value={policy.maxAttempts} onChange={e => setPolicy({ ...policy, maxAttempts: Number(e.target.value) })}>{[3, 5, 10].map(m => <option key={m} value={m}>{m}</option>)}</select></label>
        <label className="policy-row"><div><strong>{T('Longueur minimale du mot de passe', 'Minimum password length')}</strong></div><select className="w-auto" value={policy.minPasswordLength} onChange={e => setPolicy({ ...policy, minPasswordLength: Number(e.target.value) })}>{[8, 10, 12, 14].map(m => <option key={m} value={m}>{m}</option>)}</select></label>
      </div></Panel>
      <Panel title={T('Liste blanche IP des partenaires', 'Partner IP allowlist')} sub={T('Seules ces plages peuvent accéder au portail partenaire.', 'Only these ranges may reach the partner portal.')}><div className="panel-body">
        <div className="chip-row mb-3">{policy.partnerIpAllowlist.map(ip => <span key={ip} className="ip-chip"><Globe size={12} />{ip}<button aria-label={T('Retirer', 'Remove')} onClick={() => setPolicy({ ...policy, partnerIpAllowlist: policy.partnerIpAllowlist.filter(x => x !== ip) })}><Trash2 size={12} /></button></span>)}</div>
        <form className="flex gap-2" onSubmit={e => { e.preventDefault(); const v = newIp.trim(); if (!/^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/.test(v) || v.split('/')[0]!.split('.').some(n => Number(n) > 255)) { toast.error(T('Plage IP invalide (ex. 41.202.0.0/16)', 'Invalid IP range (e.g. 41.202.0.0/16)')); return; } if (!policy.partnerIpAllowlist.includes(v)) setPolicy({ ...policy, partnerIpAllowlist: [...policy.partnerIpAllowlist, v] }); setNewIp(''); }}><input placeholder="41.202.0.0/16" value={newIp} maxLength={18} onChange={e => setNewIp(e.target.value)} /><Button type="submit" variant="outline"><Plus />{T('Ajouter', 'Add')}</Button></form>
      </div></Panel>
      <Panel title={T('Matrice des rôles et permissions', 'Role and permission matrix')}><div className="table-wrap"><table className="data-table role-matrix"><thead><tr><th>{T('Permission', 'Permission')}</th><th>{T('Candidat', 'Applicant')}</th><th>{T('Partenaire', 'Partner')}</th><th>{T('Super admin', 'Super admin')}</th></tr></thead><tbody>{permissions.map(p => <tr key={p.key}><td>{locale === 'fr' ? p.fr : p.en}</td>{(['CANDIDATE', 'BANK_AGENT', 'GFASC_ADMIN'] as const).map(r => <td key={r}>{(p.roles as readonly string[]).includes(r) ? <Check size={15} className="text-success" /> : <X size={15} className="text-muted-foreground" />}</td>)}</tr>)}</tbody></table></div></Panel>
    </>}
    <Panel title={kind === 'admin' ? T('Événements de sécurité (tous portails)', 'Security events (all portals)') : T('Historique de connexion', 'Sign-in history')}><div className="table-wrap"><table className="data-table"><thead><tr><th>{T('Date', 'Date')}</th>{kind === 'admin' && <th>{T('Compte', 'Account')}</th>}<th>{T('Appareil', 'Device')}</th><th>{T('Événement', 'Event')}</th></tr></thead><tbody>{events.map(e => <tr key={e.id}><td>{new Date(e.date).toLocaleString(locale === 'fr' ? 'fr-CA' : 'en-CA', { dateStyle: 'medium', timeStyle: 'short' })}</td>{kind === 'admin' && <td>{maskEmail(e.email)}</td>}<td>{e.device}</td><td><span className={`bill-badge ${e.status === 'SUCCESS' ? 'paid' : e.status === 'FAILED' || e.status === 'LOCKED' ? 'overdue' : 'due'}`}>{statusLabel[e.status]}</span></td></tr>)}</tbody></table></div></Panel>
  </>;
}
