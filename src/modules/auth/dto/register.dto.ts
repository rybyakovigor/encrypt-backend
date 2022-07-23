// Core
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ required: true, example: 'mail@mail.ru' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: '1234qwerty' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
