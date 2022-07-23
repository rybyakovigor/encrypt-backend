import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ required: true, example: 'google' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true, example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ required: true, example: '1234qwerty' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false, example: 'http://google.com' })
  @IsString()
  @IsOptional()
  url?: string;
}
