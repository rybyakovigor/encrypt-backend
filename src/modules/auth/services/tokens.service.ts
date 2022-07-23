// Core
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

// Interfaces
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class TokensService {
  private readonly jwt_access_secret: string;

  private readonly jwt_access_expiration_time: string;

  private readonly jwt_refresh_secret: string;

  private readonly jwt_refresh_expiration_time: string;

  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    this.jwt_access_secret = this.configService.get('JWT_ACCESS_SECRET');
    this.jwt_access_expiration_time = this.configService.get('JWT_ACCESS_EXPIRATION_TIME');
    this.jwt_refresh_secret = this.configService.get('JWT_REFRESH_SECRET');
    this.jwt_refresh_expiration_time = this.configService.get('JWT_REFRESH_EXPIRATION_TIME');
  }

  async generateTokens(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwt_access_secret,
      expiresIn: this.jwt_access_expiration_time,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwt_refresh_secret,
      expiresIn: this.jwt_refresh_expiration_time,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
