// Core
import { BadRequestException, Injectable } from '@nestjs/common';

// Services
import { UserService } from '../user/user.service';
import { CryptographyService } from '../cryptography/cryptography.service';

// Dto
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly cryptographyService: CryptographyService) {}

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

  async getAuthenticatedUser(body: LoginDto) {
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
}
