// Core
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';

// Services
import { AuthService } from './auth.service';

// Dto
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserModel } from '../user/user.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Регистрация',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: OmitType(UserModel, ['password']) })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'Авторизация',
  })
  @ApiOkResponse({ status: HttpStatus.OK, type: OmitType(UserModel, ['password']) })
  async login(@Body() body: LoginDto) {
    return this.authService.getAuthenticatedUser(body);
  }
}
