import { describe, it, expect } from 'vitest';
import { authApi, portalApi, mandateApi, paymentApi, bankApi, verificationApi, publicVerificationApi, setDemoScenario } from '@/api/client';
describe('CanVerify mock frontend workflow',()=> {
 it('supports the non-biometric journey, payment recovery and correct public document',async()=>{
  setDemoScenario('success');
  await authApi.register({firstName:'Demo',lastName:'Test'});
  await bankApi.select('b4');
  await mandateApi.sign();
  expect((await paymentApi.pay(true)).status).toBe('FAILED');
  expect((await paymentApi.pay()).status).toBe('SUCCESS');
  await verificationApi.advance();await verificationApi.advance();await verificationApi.advance();
  const data=await portalApi.get();expect(data.step).toBe(7);
  const lookup=await publicVerificationApi.lookup('RVD-2026-00842');
  expect(lookup?.document.bank).toBe('Royal Bank of Canada');
  expect(lookup?.extended).toBeUndefined();
  await expect(publicVerificationApi.challenge('RVD-2026-00842','FAIL')).rejects.toThrow();
  expect((await publicVerificationApi.challenge('RVD-2026-00842','DEMO')).extended?.firstName).toBe('Demo');
 }, 15000);
 it('exposes a recoverable simulated network error',async()=>{
  setDemoScenario('network');await expect(portalApi.get()).rejects.toThrow();
  setDemoScenario('success');expect((await portalApi.get()).candidate).toBeDefined();
 });
});
