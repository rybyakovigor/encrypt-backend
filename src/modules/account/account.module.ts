// Core
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

// Controllers
import { AccountController } from './account.controller';

// Models
import { AccountModel } from './account.model';

// Services
import { AccountService } from './account.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AccountModel,
        schemaOptions: {
          collection: 'accounts',
        },
      },
    ]),
  ],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
