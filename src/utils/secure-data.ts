import crypto from 'crypto';

import { ENCRYPTION_KEY, IV_LENGTH } from '../config/env';

function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-ocb',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`; // STGore IV with the encrypted data
}

function decrypt(text: string) {
  const textParts = text.split(':');

  const ivEncrypted = textParts.shift();

  if (ivEncrypted) {
    const iv = Buffer.from(ivEncrypted, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      'aes-256-ocb',
      Buffer.from(ENCRYPTION_KEY),
      iv
    );

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
}

export { encrypt, decrypt };
