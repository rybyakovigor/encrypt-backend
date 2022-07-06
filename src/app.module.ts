// Core
import { Module } from '@nestjs/common';

// Modules
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), HealthModule, DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
