import { ENCODE_COOKIE } from '@/constants';
import { decrypt, encrypt } from '../encode';

describe('Encode util test cases', () => {
  beforeAll(() => {
    // Mock the ENCODE_COOKIE constant
    ENCODE_COOKIE.secret = 'sZ21mZzlIISeU60Xji46GASqb5UEXBu/UkXask1NJhE=';
    ENCODE_COOKIE.algorithm = 'aes-256-cbc';
  });

  test('should encrypt a given string', async () => {
    const plainText = 'Hello, World!';
    const encrypted = (await encrypt(plainText)) || '';

    expect(encrypted).toBeDefined();
    expect(typeof encrypted).toBe('string');

    // Ensure it contains an IV part and encrypted data part
    const parts = encrypted.split(':');
    expect(parts.length).toBe(2);
    expect(parts[0].length).toBe(32); // IV should be 16 bytes, represented in hex (32 characters)
  });

  test('should decrypt an encrypted string to the original value', async () => {
    const plainText = 'Hello, World!';
    const encrypted = (await encrypt(plainText)) || '';

    const decrypted = await decrypt(encrypted);

    expect(decrypted).toBe(plainText);
  });

  test('should return undefined when secretKey is missing', async () => {
    ENCODE_COOKIE.secret = '';

    const plainText = 'Hello, World!';
    const encrypted = await encrypt(plainText);
    const decrypted = await decrypt(encrypted || '');

    expect(encrypted).toBeUndefined();
    expect(decrypted).toBeUndefined();
  });
});
