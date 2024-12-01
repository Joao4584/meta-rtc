import crypto from 'crypto';

export const configCrypto = {
  SECRET_KEY: crypto.randomBytes(32),
  ALGORITHM: 'aes-256-cbc',
  IV_LENGTH: 16
};
