import { ENCODE_COOKIE } from '@/constants';
import crypto from 'crypto';

export const encrypt = async (value: string) => {
  const iv = crypto.randomBytes(16);

  const secreyKeyString = ENCODE_COOKIE.secret || '';

  if (!secreyKeyString) return;

  const secretKey = Buffer.from(secreyKeyString, 'base64');

  const cipher = crypto.createCipheriv(ENCODE_COOKIE.algorithm, secretKey, iv);

  let encrypted = cipher.update(value, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
};

export const decrypt = async (encrypted: string) => {
  const [ivHex, encryptedData] = encrypted.split(':');

  const secreyKeyString = ENCODE_COOKIE.secret || '';

  if (!secreyKeyString) return;

  const secretKey = Buffer.from(secreyKeyString, 'base64');

  const decipher = crypto.createDecipheriv(
    ENCODE_COOKIE.algorithm,
    secretKey,
    Buffer.from(ivHex, 'hex'),
  );

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
