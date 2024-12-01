import crypto from 'crypto';
import { configCrypto } from '@/config/crypto'; 

export class CryptoService {
  private readonly secretKey: Buffer;
  private readonly algorithm: string;
  private readonly ivLength: number;

  constructor() {
    this.secretKey = configCrypto.SECRET_KEY;
    this.algorithm = configCrypto.ALGORITHM;
    this.ivLength = configCrypto.IV_LENGTH;
  }

  encrypt(data: string): string {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv); 

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex'); 

    return `${iv.toString('hex')}:${encrypted}`;
  }

  decrypt(encryptedData: string): string {
    const [iv, encrypted] = encryptedData.split(':');
    const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(iv, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8'); 

    return decrypted;
  }
}
