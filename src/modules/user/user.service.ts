// Core
import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

// Models
import { UserModel } from './user.model';

// Dto
import { CreateUserDto } from './dto/create-user.dto';

// Types
import { MongoErrorCodes } from 'src/@types-space/enums/mongo-error-codes.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    return user;
  }

  async create(body: CreateUserDto) {
    try {
      const newDocument = await this.userModel.create(body);
      await newDocument.save();
      return newDocument.toJSON();
    } catch (error) {
      if (error.code === MongoErrorCodes.UniqueViolation) {
        throw new ConflictException('User with that email already exists');
      }

      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
