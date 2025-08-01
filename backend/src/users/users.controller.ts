import { CreateUserDto } from './entities/CreateUserDto.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}
  
  @Get()
  async findAll(): Promise<User[]> {
    const response = await this._usersService.findAll();
    return response;
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    const response = await this._usersService.create(body);
    return response;
  }
}
