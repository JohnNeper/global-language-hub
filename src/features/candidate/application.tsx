import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Camera, RefreshCw, Check, ArrowRight, Printer, PenLine, ShieldCheck, UploadCloud, Info, UserRound, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { DataBoundary, PageHeader, Panel, Busy, Logo, formatDate } from '@/components/canverify/ui';
import { useLocale } from '@/i18n';
import { applicationApi, documentApi, mandateApi } from '@/api/client';
import type { ApplicationForm, PortalData } from '@/types';

const tr = (l: string) => (fr: string, en: string) => (l === 'fr' ? fr : en);
const appTypes = ['Permis d’études / Study Permit', 'Immigration permanente / Permanent residence', 'Visa visiteur / Visitor visa', 'Permis de travail / Work permit'];
const schools = ['Université de Moncton (N.-B.)', 'University of New Brunswick (UNB)', 'NBCC (New Brunswick Community College)', 'CCNB (Collège communautaire du N.-B.)', 'Mount Allison University (N.-B.)', 'Dalhousie University (N.-É.)', 'Saint Mary’s University (N.-É.)', 'University of Prince Edward Island (UPEI)', 'Memorial University of Newfoundland', 'UQAR (Université du Québec à Rimouski)', 'Université Laval', 'Université de Montréal', 'McGill University', 'Concordia University', 'UQAM', 'Université de Sherbrooke', 'HEC Montréal', 'Polytechnique Montréal', 'Collège LaSalle', 'Cégep de la Gaspésie et des Îles', 'University of Toronto', 'University of Ottawa / Université d’Ottawa', 'York University', 'Western University'];
const relations = ['Père / Father', 'Mère / Mother', 'Oncle / Uncle', 'Tante / Aunt', 'Frère / Sœur / Sibling', 'Autre / Other'];
const fundSources = ['Salaires & Épargne / Salary & Savings', 'Revenus commerciaux / Business income', 'Donation familiale / Family gift', 'Vente de bien / Sale of property', 'Héritage / Inheritance', 'Autre / Other'];

/* ---------- Face photo capture ---------- */
export function FaceCapture({ label, value, onChange }: { label: string; value?: string; onChange: (v?: string) => void }) {
  const { locale } = useLocale(); const T = tr(locale); const video = useRef<HTMLVideoElement>(null); const stream = useRef<MediaStream | null>(null); const [live, setLive] = useState(false); const [error, setError] = useState(false); const fileRef = useRef<HTMLInputElement>(null);
  const stop = () => { stream.current?.getTracks().forEach(t => t.stop()); stream.current = null; setLive(false); };
  useEffect(() => stop, []);
  const start = async () => { setError(false); try { const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } }); stream.current = s; setLive(true); requestAnimationFrame(() => { if (video.current) { video.current.srcObject = s; void video.current.play(); } }); } catch { setError(true); } };
  const shoot = () => { const v = video.current; if (!v) return; const c = document.createElement('canvas'); c.width = v.videoWidth || 640; c.height = v.videoHeight || 480; const ctx = c.getContext('2d'); if (!ctx) return; ctx.translate(c.width, 0); ctx.scale(-1, 1); ctx.drawImage(v, 0, 0, c.width, c.height); onChange(c.toDataURL('image/jpeg', 0.85)); stop(); };
  const fromFile = (f?: File) => { if (!f) return; const r = new FileReader(); r.onload = () => onChange(String(r.result)); r.readAsDataURL(f); };
  return <div className="face-capture">
    <div className="face-frame">{value ? <img src={value} alt={label} /> : live ? <video ref={video} playsInline muted /> : <div className="face-placeholder"><UserRound size={44} /><span>{label}</span></div>}{(live || !value) && <div className="face-guide" aria-hidden />}{value && <span className="face-ok"><Check size={14} />{T('Photo capturée', 'Photo captured')}</span>}</div>
    <ul className="face-tips"><li>{T('Visage de face, bien droit, centré dans l’ovale', 'Face straight on, centred in the oval')}</li><li>{T('Bonne lumière, sans lunettes ni couvre-chef', 'Good lighting, no glasses or headwear')}</li><li>{T('Regard dirigé vers la caméra', 'Look directly at the camera')}</li></ul>
    <div className="form-actions start">{live ? <Button type="button" onClick={shoot}><Camera />{T('Prendre la photo', 'Take photo')}</Button> : <Button type="button" variant={value ? 'outline' : 'default'} onClick={() => { onChange(undefined); void start(); }}>{value ? <RefreshCw /> : <Camera />}{value ? T('Reprendre', 'Retake') : T('Ouvrir la caméra', 'Open camera')}</Button>}<Button type="button" variant="ghost" onClick={() => fileRef.current?.click()}><UploadCloud />{T('Importer une photo', 'Upload a photo')}</Button><input ref={fileRef} hidden type="file" accept="image/*" capture="user" onChange={e => fromFile(e.target.files?.[0])} /></div>
    {error && <p className="error-message">{T('Caméra indisponible. Autorisez l’accès ou importez une photo prise de face.', 'Camera unavailable. Allow access or upload a front-facing photo.')}</p>}
    <p className="text-xs text-muted-foreground">{T('Démonstration : la photo reste uniquement dans ce navigateur et disparaît au rechargement.', 'Demo: the photo stays in this browser only and is cleared on reload.')}</p>
  </div>;
}

/* ---------- Step 2: application data ---------- */
export function ApplicationFormPage() {
  const { locale } = useLocale(); const T = tr(locale);
  return <><PageHeader eyebrow={T('Étape 2 · Données', 'Step 2 · Data')} title={T('Espace candidat — formulaire de demande', 'Applicant portal — application form')} subtitle={T('Renseignez votre dossier, prenez votre photo de face et indiquez l’institution financière qui garantit vos fonds.', 'Complete your file, take a front-facing photo and indicate the financial institution guaranteeing your funds.')} /><DataBoundary>{data => <FormBody data={data} />}</DataBoundary></>;
}

function FormBody({ data }: { data: PortalData }) {
  const { locale } = useLocale(); const T = tr(locale); const navigate = useNavigate(); const client = useQueryClient(); const prev = data.application;
  const [f, setF] = useState<ApplicationForm>(prev ?? { caseNumber: data.cases[0]?.reference ?? data.candidate.reference, holder: 'SELF', applicant: { lastName: data.candidate.lastName, firstName: data.candidate.firstName, dateOfBirth: data.candidate.dateOfBirth, passportNumber: '' }, applicationType: appTypes[0]!, school: '', bankId: '', bankName: '', accountNumber: '', fundSource: '', submittedAt: '' });
  const [schoolOther, setSchoolOther] = useState(false); const [bankOther, setBankOther] = useState(!!prev && !data.banks.some(b => b.id === prev.bankId)); const [passport, setPassport] = useState<File | null>(null); const [tried, setTried] = useState(false);
  const banks = data.banks.filter(b => b.status === 'ACTIVE');
  const sponsor = f.sponsor ?? { lastName: '', firstName: '', relation: '', email: '', address: '' };
  const setA = (k: keyof ApplicationForm['applicant'], v?: string) => setF({ ...f, applicant: { ...f.applicant, [k]: v } });
  const setS = (k: keyof typeof sponsor, v?: string) => setF({ ...f, sponsor: { ...sponsor, [k]: v } });
  const hasPassport = !!passport || data.documents.length > 0;
  const missing = [!f.applicant.photo && T('photo du candidat', 'applicant photo'), !hasPassport && T('scan du passeport', 'passport scan'), f.holder === 'SPONSOR' && !sponsor.photo && T('photo du garant', 'sponsor photo')].filter(Boolean) as string[];
  const submit = useMutation({ mutationFn: async () => { if (passport) await documentApi.upload(passport); return applicationApi.submit({ ...f, sponsor: f.holder === 'SPONSOR' ? sponsor : undefined, bankName: bankOther ? f.bankName : banks.find(b => b.id === f.bankId)?.name ?? '', submittedAt: new Date().toISOString() }); }, onSuccess: async () => { await client.invalidateQueries({ queryKey: ['portal'] }); toast.success(T('Dossier soumis — mandat de vérification généré', 'File submitted — verification mandate generated')); navigate({ to: '/candidate/verification/mandate' }); }, onError: () => toast.error(T('Échec : vérifiez le passeport (PDF/JPG, 10 Mo max).', 'Failed: check the passport file (PDF/JPG, 10 MB max).')) });
  return <form className="application-form" onSubmit={e => { e.preventDefault(); setTried(true); if (missing.length) return; submit.mutate(); }}>
    <div className="case-banner"><div><small>{T('Numéro de dossier', 'File number')}</small><strong>{f.caseNumber}</strong></div><div><small>{T('Référence candidat', 'Applicant reference')}</small><strong>{data.candidate.reference}</strong></div></div>
    <Panel title={T('Qui est le titulaire des fonds à vérifier ?', 'Who holds the funds to be verified?')}><div className="panel-body holder-choice">{([['SELF', UserRound, T('Moi-même (candidat)', 'Myself (applicant)')], ['SPONSOR', Users, T('Un garant (sponsor)', 'A sponsor (guarantor)')]] as const).map(([k, Icon, l]) => <label key={k} className={`holder-option ${f.holder === k ? 'active' : ''}`}><input type="radio" name="holder" checked={f.holder === k} onChange={() => setF({ ...f, holder: k })} /><Icon size={18} />{l}</label>)}</div></Panel>
    <Panel title={T('1. Identité du candidat', '1. Applicant identity')}><div className="panel-body"><div className="form-grid">
      <label className="form-field">{T('Nom de famille', 'Last name')}<input required value={f.applicant.lastName} onChange={e => setA('lastName', e.target.value)} /></label>
      <label className="form-field">{T('Prénoms', 'First name(s)')}<input required value={f.applicant.firstName} onChange={e => setA('firstName', e.target.value)} /></label>
      <label className="form-field">{T('Date de naissance', 'Date of birth')}<input type="date" required value={f.applicant.dateOfBirth} onChange={e => setA('dateOfBirth', e.target.value)} /></label>
      <label className="form-field">{T('N° de passeport', 'Passport number')}<input required placeholder="CM123456" pattern="[A-Za-z0-9]{6,12}" value={f.applicant.passportNumber} onChange={e => setA('passportNumber', e.target.value.toUpperCase())} /></label>
      <label className="form-field">{T('Nature de la demande', 'Application type')}<select value={f.applicationType} onChange={e => setF({ ...f, applicationType: e.target.value })}>{appTypes.map(a => <option key={a}>{a}</option>)}</select></label>
      <label className="form-field">{T('Établissement d’enseignement (EED)', 'Designated Learning Institution (DLI)')}<select required={!schoolOther} value={schoolOther ? '__other' : f.school} onChange={e => { const o = e.target.value === '__other'; setSchoolOther(o); setF({ ...f, school: o ? '' : e.target.value }); }}><option value="">{T('— Sélectionnez —', '— Select —')}</option>{schools.map(s => <option key={s}>{s}</option>)}<option value="__other">{T('Autre (saisie manuelle)', 'Other (manual entry)')}</option></select></label>
      {schoolOther && <label className="form-field full">{T('Nom de l’établissement', 'Institution name')}<input required value={f.school} onChange={e => setF({ ...f, school: e.target.value })} /></label>}
      <label className="form-field full">{T('Scan du passeport (PDF ou JPG, 10 Mo max)', 'Passport scan (PDF or JPG, 10 MB max)')}<input type="file" accept="application/pdf,image/jpeg" onChange={e => setPassport(e.target.files?.[0] ?? null)} />{data.documents.length > 0 && !passport && <small>{T('Déjà transmis : ', 'Already provided: ')}{data.documents[0]?.name}</small>}</label>
    </div><h3 className="sub-heading">{T('Photo de vérification du candidat', 'Applicant verification photo')}</h3><FaceCapture label={T('Candidat', 'Applicant')} value={f.applicant.photo} onChange={v => setA('photo', v)} /></div></Panel>
    {f.holder === 'SPONSOR' && <Panel title={T('2. Identité du garant (sponsor)', '2. Sponsor identity')}><div className="panel-body"><div className="form-grid">
      <label className="form-field">{T('Nom du garant', 'Sponsor last name')}<input required value={sponsor.lastName} onChange={e => setS('lastName', e.target.value)} /></label>
      <label className="form-field">{T('Prénoms du garant', 'Sponsor first name(s)')}<input required value={sponsor.firstName} onChange={e => setS('firstName', e.target.value)} /></label>
      <label className="form-field">{T('Lien de parenté', 'Relationship')}<select required value={sponsor.relation} onChange={e => setS('relation', e.target.value)}><option value="">{T('— Sélectionner —', '— Select —')}</option>{relations.map(r => <option key={r}>{r}</option>)}</select></label>
      <label className="form-field">{T('Courriel du garant', 'Sponsor email')}<input type="email" required value={sponsor.email} onChange={e => setS('email', e.target.value)} /></label>
      <label className="form-field full">{T('Adresse de résidence', 'Residential address')}<input required placeholder={T('Ville, pays', 'City, country')} value={sponsor.address} onChange={e => setS('address', e.target.value)} /></label>
    </div><h3 className="sub-heading">{T('Photo de vérification du garant', 'Sponsor verification photo')}</h3><FaceCapture label={T('Garant', 'Sponsor')} value={sponsor.photo} onChange={v => setS('photo', v)} /></div></Panel>}
    <Panel title={T(`${f.holder === 'SPONSOR' ? 3 : 2}. Institution financière garante`, `${f.holder === 'SPONSOR' ? 3 : 2}. Guaranteeing financial institution`)}><div className="panel-body">
      <div className="notice mb-4"><Info size={15} />{T('GFASC agit en qualité de tiers vérificateur avec une obligation de moyens. La validité du RVD dépend de la réponse de votre institution financière.', 'GFASC acts as an independent third-party verifier with a best-efforts obligation. RVD validity depends on your financial institution’s response.')}</div>
      <div className="form-grid">
        <label className="form-field">{T('Nom de la banque', 'Bank name')}<select required value={bankOther ? '__other' : f.bankId} onChange={e => { const o = e.target.value === '__other'; setBankOther(o); setF({ ...f, bankId: o ? '' : e.target.value }); }}><option value="">{T('— Sélectionnez votre banque —', '— Select your bank —')}</option>{banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}<option value="__other">{T('Autre (saisie manuelle)', 'Other (manual entry)')}</option></select></label>
        {bankOther && <label className="form-field">{T('Nom de la banque (saisie manuelle)', 'Bank name (manual entry)')}<input required value={f.bankName} onChange={e => setF({ ...f, bankName: e.target.value })} /></label>}
        <label className="form-field">{T('Numéro de compte', 'Account number')}<input required inputMode="numeric" pattern="[0-9 ]{8,30}" placeholder="XXXXXXXXXXXXXXXX" value={f.accountNumber} onChange={e => setF({ ...f, accountNumber: e.target.value })} /></label>
        <label className="form-field">{T('Origine des fonds', 'Source of funds')}<select required value={f.fundSource} onChange={e => setF({ ...f, fundSource: e.target.value })}><option value="">{T('— Sélectionner —', '— Select —')}</option>{fundSources.map(s => <option key={s}>{s}</option>)}</select></label>
      </div></div></Panel>
    {tried && missing.length > 0 && <p className="error-message" role="alert">{T('Éléments manquants : ', 'Missing: ')}{missing.join(', ')}</p>}
    <div className="form-actions"><Button type="submit" size="lg" disabled={submit.isPending}><Busy busy={submit.isPending}><PenLine />{T('Valider et signer le mandat', 'Validate and sign the mandate')}<ArrowRight /></Busy></Button></div>
  </form>;
}

/* ---------- Step 3: mandate signature ---------- */
export function MandateSignPage() {
  const { locale } = useLocale(); const T = tr(locale);
  return <><PageHeader eyebrow={T('Étape 3 · Mandat', 'Step 3 · Mandate')} title={T('Signature du mandat', 'Mandate signature')} subtitle={T('Lisez et signez le mandat ci-dessous. Ce document autorise votre banque à communiquer avec GFASC.', 'Read and sign the mandate below. This document authorizes your bank to communicate with GFASC.')} /><DataBoundary>{data => <MandateBody data={data} />}</DataBoundary></>;
}

function MandateBody({ data }: { data: PortalData }) {
  const { locale } = useLocale(); const T = tr(locale); const client = useQueryClient(); const navigate = useNavigate(); const a = data.application; const [consent, setConsent] = useState(false); const [sig, setSig] = useState('');
  const sign = useMutation({ mutationFn: () => mandateApi.sign(sig.trim()), onSuccess: async () => { await client.invalidateQueries({ queryKey: ['portal'] }); toast.success(T('Mandat signé', 'Mandate signed')); navigate({ to: '/candidate/verification/payment' }); } });
  if (!a) return <Panel className="narrow"><div className="panel-body"><p>{T('Complétez d’abord le formulaire de demande.', 'Complete the application form first.')}</p><div className="form-actions start"><Button asChild><Link to="/candidate/verification/documents">{T('Remplir le formulaire', 'Fill in the form')}<ArrowRight /></Link></Button></div></div></Panel>;
  const holder = a.holder === 'SPONSOR' && a.sponsor ? `${a.sponsor.firstName} ${a.sponsor.lastName}` : `${a.applicant.firstName} ${a.applicant.lastName}`;
  const expected = holder.trim().toLowerCase().replace(/\s+/g, ' ');
  const sigOk = sig.trim().toLowerCase().replace(/\s+/g, ' ') === expected;
  const masked = a.accountNumber.replace(/\s/g, '').replace(/.(?=.{4})/g, '•');
  return <div className="mandate-wrap">
    <div className="mandate-toolbar"><Button variant="outline" onClick={() => window.print()}><Printer />{T('Imprimer / PDF', 'Print / PDF')}</Button></div>
    <article className="mandate-doc" id="mandate-print">
      <header><Logo /><div><strong>GLOBAL FINANCIAL AUTHENTICATION SERVICES CANADA Inc.</strong><h2>MANDAT DE VÉRIFICATION ET D’AUTORISATION DE DIVULGATION</h2><p className="en">VERIFICATION MANDATE AND DISCLOSURE AUTHORIZATION</p></div></header>
      <div className="mandate-meta"><span>{T('Dossier', 'File')} : <b>{a.caseNumber}</b></span><span>{T('Date', 'Date')} : <b>{formatDate(new Date().toISOString(), locale)}</b></span></div>
      <p><b>{T('ENTRE / BETWEEN', 'BETWEEN / ENTRE')} :</b> {holder} ({a.holder === 'SPONSOR' ? T('garant', 'sponsor') : T('titulaire', 'account holder')}){a.holder === 'SPONSOR' && <> {T('au bénéfice de', 'for the benefit of')} {a.applicant.firstName} {a.applicant.lastName} ({T('candidat', 'applicant')})</>}</p>
      <p><b>ET / AND :</b> GLOBAL FINANCIAL AUTHENTICATION SERVICES CANADA Inc. (GFASC) — {T('Tiers vérificateur agréé', 'Authorized third-party verifier')}</p>
      <p><b>CONCERNANT / REGARDING :</b> {T('Compte N°', 'Account No.')} <b>{masked}</b> {T('détenu auprès de', 'held with')} <b>{a.bankName}</b>.</p>
      <h3>1. OBJET / PURPOSE</h3><p>Par la présente, les soussignés autorisent irrévocablement l’institution financière susmentionnée à divulguer à GFASC toute information nécessaire pour confirmer l’authenticité des relevés, le solde actuel et l’absence de blocage sur les fonds.</p><p className="en">The undersigned hereby irrevocably authorize the above-mentioned financial institution to disclose to GFASC any information necessary to confirm the authenticity of statements, the current balance, and the non-encumbrance of funds.</p>
      <h3>2. LEVÉE DU SECRET / WAIVER</h3><p>Le titulaire libère expressément son institution financière de son obligation de secret bancaire à l’égard de GFASC pour les besoins exclusifs de cette vérification.</p><p className="en">The account holder expressly releases the financial institution from its banking secrecy obligation towards GFASC for the exclusive purpose of this verification.</p>
      <h3>3. PORTÉE / SCOPE</h3><p>Cette autorisation est valide pour une durée de 90 jours. Elle couvre la confirmation des soldes, l’historique sur 6 mois et l’absence de nantissement.</p><p className="en">This authorization is valid for 90 days. It covers balance confirmation, 6-month history, and non-encumbrance status.</p>
      <h3>4. DÉCLARATION / DECLARATION</h3><p>Je certifie que les fonds sont licites et libres de toute dette. <span className="en">I certify that the funds are licit and free of any debt.</span></p>
      {data.mandate.signed && <div className="signature-block"><span>{T('Signé électroniquement par', 'Electronically signed by')}</span><strong className="signature-script">{data.mandate.signature || holder}</strong><small>{formatDate(data.mandate.signedAt ?? new Date().toISOString(), locale)} · {data.mandate.hash}</small></div>}
      <p className="demo-mark">DEMO DOCUMENT — NOT AN OFFICIAL RECORD</p>
    </article>
    {data.mandate.signed ? <div className="form-actions"><span className="text-success text-sm flex items-center gap-1"><ShieldCheck size={16} />{T('Mandat signé', 'Mandate signed')}</span><Button asChild><Link to="/candidate/verification/payment">{T('Continuer vers le paiement', 'Continue to payment')}<ArrowRight /></Link></Button></div> :
      <Panel><div className="panel-body"><label className="checkbox-label"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />{T('Je, soussigné(e), ai lu, compris et accepté les termes de ce mandat.', 'I, the undersigned, have read, understood and accepted the terms of this mandate.')}</label>
        <label className="form-field mt-4">{T('Tapez votre nom complet pour signer', 'Type your full name to sign')} ({holder})<input className="signature-input" placeholder={T('Signer ici…', 'Sign here…')} value={sig} onChange={e => setSig(e.target.value)} /></label>
        {sig && !sigOk && <p className="error-message">{T('La signature doit correspondre exactement au nom du titulaire : ', 'The signature must match the holder’s name: ')}{holder}</p>}
        <div className="form-actions"><Button disabled={!consent || !sigOk || sign.isPending} onClick={() => sign.mutate()}><Busy busy={sign.isPending}><Check />{T('Confirmer la signature et continuer', 'Confirm signature and continue')}</Busy></Button></div></div></Panel>}
  </div>;
}
