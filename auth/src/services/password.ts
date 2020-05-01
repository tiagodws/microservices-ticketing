import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(hashedStoredPassword: string, suppliedPassword: string) {
    const hashedSuppliedPassword = await this.toHash(suppliedPassword);
    const [stored] = hashedStoredPassword.split('.');
    const [provided] = hashedSuppliedPassword.split('.');

    return stored === provided;
  }
}
