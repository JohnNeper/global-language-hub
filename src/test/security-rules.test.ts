import { describe, expect, it } from 'vitest';
import { generateOtp, isStrongPassword, maskAccount, nextLock, LOCKOUT_SECONDS, defaultPolicy } from '@/lib/security';

describe('GFASC security rules', () => {
  it('locks access after 5 failed attempts for 60 seconds', () => {
    expect(nextLock(4, 1000)).toBeNull();
    expect(nextLock(5, 1000)).toBe(1000 + LOCKOUT_SECONDS * 1000);
    expect(LOCKOUT_SECONDS).toBe(60);
  });
  it('signs users out after 15 minutes of inactivity by default', () => {
    expect(defaultPolicy.timeoutMinutes).toBe(15);
  });
  it('one-time codes are 6 digits', () => {
    for (let i = 0; i < 20; i++) expect(generateOtp()).toMatch(/^\d{6}$/);
  });
  it('requires 10+ chars with upper, lower, digit and symbol', () => {
    expect(isStrongPassword('Short1!')).toBe(false);
    expect(isStrongPassword('alllowercase1!')).toBe(false);
    expect(isStrongPassword('Gfasc-Secure-2026')).toBe(true);
  });
  it('masks account numbers except the last 4 digits', () => {
    expect(maskAccount('1234 5678 9012')).toBe('••••••••9012');
  });
});
