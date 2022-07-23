// Core
import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface AccountModel extends Base {}
export class AccountModel extends TimeStamps {
  @ApiProperty()
  @prop({ required: true, unique: true })
  title: string;

  @ApiProperty()
  @prop({ required: true })
  login: string;

  @ApiProperty()
  @prop({ required: true })
  password: string;

  @ApiProperty()
  @prop({ required: false, default: null })
  url?: string;
}
