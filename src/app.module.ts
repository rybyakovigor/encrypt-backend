// Core
import { Module } from '@nestjs/common';

// Modules
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), HealthModule, DatabaseModule],
})
export class AppModule {}
