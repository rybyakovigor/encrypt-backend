// Core
import { Injectable } from '@nestjs/common';
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptographyService {
  promisifyScrypt = promisify(scrypt);

  async hash(password: string) {
    const salt = randomBytes(16).toString('hex');

    const passwordBuffer = (await this.promisifyScrypt(password, salt, 64)) as Buffer;
    return `${salt}:${passwordBuffer.toString('hex')}`;
  }

  async verify(password: string, hash: string) {
    const [salt, hashedPassword] = hash.split(':');
    const hashedPasswordBuffer = Buffer.from(hashedPassword, 'hex');

    const passwordBuffer = (await this.promisifyScrypt(password, salt, 64)) as Buffer;

    return timingSafeEqual(hashedPasswordBuffer, passwordBuffer);
  }
}
