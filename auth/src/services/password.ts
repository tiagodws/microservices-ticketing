import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const encryptedPassword = await this.encrypt(password, salt);
    return `${encryptedPassword}.${salt}`;
  }

  static async encrypt(password: string, salt: string): Promise<string> {
    const buff = (await scryptAsync(password, salt, 64)) as Buffer;
    return buff.toString('hex');
  }

  static async compare(hashedStoredPassword: string, password: string) {
    const [encryptedStoredPassword, salt] = hashedStoredPassword.split('.');
    const encryptedProvidedPassword = await this.encrypt(password, salt);
    return encryptedStoredPassword === encryptedProvidedPassword;
  }
}
