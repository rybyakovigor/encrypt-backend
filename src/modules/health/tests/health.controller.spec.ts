// Core
import { Test, TestingModule } from '@nestjs/testing';

// Services
import { HealthService } from '../health.service';

// Controllers
import { HealthController } from '../health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('check status', () => {
    it('should return app status', async () => {
      expect(await healthController.check()).toMatchObject({
        message: "I'm alive",
      });
    });
  });
});
