// Core
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Services
import { UserService } from '../../user/user.service';
import { CryptographyService } from '../../cryptography/cryptography.service';
import { TokensService } from './tokens.service';

// Dto
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  private readonly cookie_expiration_time: string;

  constructor(
    private readonly userService: UserService,
    private readonly cryptographyService: CryptographyService,
    private readonly tokensService: TokensService,
    private readonly configService: ConfigService
  ) {
    this.cookie_expiration_time = this.configService.get('COOKIE_EXPIRATION_TIME');
  }

  async register(body: RegisterDto) {
    const hashedPassword = await this.cryptographyService.hash(body.password);

    const newUserBody = {
      email: body.email,
      password: hashedPassword,
    };

    const newUser = await this.userService.create(newUserBody);
    delete newUser.password;

    return newUser;
  }

  async login(body: LoginDto) {
    const user = await this.getAuthenticatedUser(body);

    const { _id, email } = user;

    const tokens = await this.tokensService.generateTokens({ _id, email });
    const cookie = this.getCookieWithJwtRefreshToken(tokens.refreshToken, this.cookie_expiration_time);

    return {
      _id: user._id,
      email: user.email,
      access_token: tokens.accessToken,
      cookie,
    };
  }

  private async getAuthenticatedUser(body: LoginDto) {
    try {
      const user = await this.userService.findByEmail(body.email);

      const isPasswordValid = await this.cryptographyService.verify(body.password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Wrong credentials provided');
      }

      delete user.password;

      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  private getCookieWithJwtRefreshToken(token: string, cookie_expiration_time: string) {
    return `Refresh=${token}; HttpOnly; Max-Age=${cookie_expiration_time}`;
  }
}
