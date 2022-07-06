// Core
import { Module } from '@nestjs/common';

// Modules
import { UserModule } from '../user/user.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

// Services
import { AuthService } from './auth.service';

// Controllers
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, CryptographyModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
