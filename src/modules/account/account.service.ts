// Core
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

// Models
import { AccountModel } from './account.model';

// Dto
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(@InjectModel(AccountModel) private readonly accountModel: ModelType<AccountModel>) {}

  async findAll() {
    return this.accountModel.find().lean().exec();
  }

  async findOne(id: string) {
    const document = await this.accountModel.findById(id).lean().exec();

    if (!document) {
      throw new NotFoundException('Account not found');
    }
    return document;
  }

  async create(body: CreateAccountDto) {
    try {
      return await this.accountModel.create(body);
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async update(id: string, body: UpdateAccountDto) {
    await this.findOne(id);
    try {
      const updatedDocument = await this.accountModel.findByIdAndUpdate({ _id: id }, body, { new: true });
      updatedDocument.save();

      return updatedDocument.toJSON();
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    await this.findOne(id);
    try {
      await this.accountModel.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
