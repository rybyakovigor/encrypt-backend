// Core
import { Module } from '@nestjs/common';

// Services
import { CryptographyService } from './cryptography.service';

@Module({
  providers: [CryptographyService],
  exports: [CryptographyService],
})
export class CryptographyModule {}
