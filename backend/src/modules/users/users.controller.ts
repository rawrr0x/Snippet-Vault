import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { setEmailToCookies } from 'src/common/utils/set-email-to-cookies.util';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ description: 'Data for user creating', type: CreateUserDto })
  @Post()
  async create(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.usersService.create(dto);

    setEmailToCookies(res, user.email);

    return user;
  }

  @ApiOperation({ summary: 'Login' })
  @ApiBody({ description: 'Data for login', type: LoginDto })
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.usersService.login(dto);

    setEmailToCookies(res, user.email);

    return user;
  }

  @Get('logout')
  async logout() {}
}
