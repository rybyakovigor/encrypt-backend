// Core
import { PickType } from '@nestjs/swagger';

// Dto
import { RegisterDto } from './register.dto';

export class LoginDto extends PickType(RegisterDto, ['email', 'password'] as const) {}
