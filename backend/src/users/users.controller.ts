import { CreateUserDto } from './dto/CreateUserDto.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}
  
  @Get()
  async findAll(): Promise<User[]> {
    const response = await this._usersService.findAll();
    return response;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const response = await this._usersService.findOne(id);
    return response;
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    const response = await this._usersService.create(body);
    return response;
  }
}
