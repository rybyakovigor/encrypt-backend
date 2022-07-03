// Core
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

// Services
import { HealthService } from './health.service';

// Types
import { ResponseMessage } from '../../@types-space/classes/response-message.class';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ResponseMessage,
  })
  @Get()
  check(): ResponseMessage {
    return this.healthService.check();
  }
}
