// Core
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

// Modules
import { UserModule } from '../user/user.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

// Services
import { AuthService } from './services/auth.service';
import { TokensService } from './services/tokens.service';

// Controllers
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, CryptographyModule, ConfigModule, JwtModule],
  providers: [AuthService, TokensService],
  controllers: [AuthController],
})
export class AuthModule {}
