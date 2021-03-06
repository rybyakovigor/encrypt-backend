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

// Strategies
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [UserModule, CryptographyModule, ConfigModule, JwtModule],
  providers: [AuthService, TokensService, JwtStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
