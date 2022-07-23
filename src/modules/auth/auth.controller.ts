// Core
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { Request } from 'express';

// Services
import { AuthService } from './services/auth.service';

// Dto
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// Models
import { UserModel } from '../user/user.model';

// Guards
import JwtRefreshGuard from './guards/jwt-refresh.guard';

// Interfaces
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { RefreshResponse } from './interfaces/refresh-response.interface';

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
  async login(@Body() body: LoginDto, @Req() request: Request) {
    const loginInfo = await this.authService.login(body);

    request.res.setHeader('Set-Cookie', loginInfo.cookie);

    delete loginInfo.cookie;
    return loginInfo;
  }

  @UseGuards(JwtRefreshGuard)
  @ApiCookieAuth()
  @Get('refresh')
  @ApiOperation({
    summary: 'Обновление токенов',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RefreshResponse,
  })
  async refresh(@Req() request: RequestWithUser) {
    const email = request.user.email;
    const { cookie, access_token } = await this.authService.refreshTokens(email);

    request.res.setHeader('Set-Cookie', cookie);
    return { access_token };
  }
}
