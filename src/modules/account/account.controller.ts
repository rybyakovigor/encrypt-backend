// Core
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Guards
import JwtAuthenticationGuard from '../auth/guards/jwt-authentication.guard';
import { AccountModel } from './account.model';

// Services
import { AccountService } from './account.service';

// Dto
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiBearerAuth()
@ApiTags('accounts')
@UseGuards(JwtAuthenticationGuard)
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({
    summary: 'Получить все аккаунты',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [AccountModel],
  })
  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @ApiOperation({
    summary: 'Получить аккаунт по id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountModel,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @ApiOperation({
    summary: 'Создать аккаунт',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AccountModel,
  })
  @Post()
  create(@Body() body: CreateAccountDto) {
    return this.accountService.create(body);
  }

  @ApiOperation({
    summary: 'Обновить аккаунт',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountModel,
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateAccountDto) {
    return this.accountService.update(id, body);
  }

  @ApiOperation({
    summary: 'Удалить аккаунт',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.accountService.delete(id);
  }
}
