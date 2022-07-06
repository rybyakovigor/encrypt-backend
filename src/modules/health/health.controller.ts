// Core
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

// Services
import { HealthService } from './health.service';

// Types
import { ResponseMessage } from '../../@types-space/classes/response-message.class';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({
    summary: 'Проверка работоспособности api',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ResponseMessage,
  })
  @Get()
  check(): ResponseMessage {
    return this.healthService.check();
  }
}
