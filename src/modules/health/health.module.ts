// Core
import { Module } from '@nestjs/common';

// Services
import { HealthService } from './health.service';

// Controllers
import { HealthController } from './health.controller';

@Module({
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
