// Core
import { Injectable } from '@nestjs/common';

// Types
import { ResponseMessage } from '../../@types-space/classes/response-message.class';

@Injectable()
export class HealthService {
  check(): ResponseMessage {
    return {
      message: "I'm alive",
    };
  }
}
