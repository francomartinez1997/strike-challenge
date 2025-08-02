import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly _roleRepository: Repository<Role>
  ) {}

  async create(body: CreateUserDto): Promise<User> {
    const { roleId, ...userData } = body;

    const role = await this._roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException(`Role with id ${roleId} not found`);
    }

    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = this._userRepository.create({
        ...userData,
        password: hashedPassword,
        role,
      });

      const savedUser = await this._userRepository.save(user);

      return plainToInstance(User, savedUser);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(`Error creating user: ${error.message}`);
      throw new BadRequestException('Unexpected error occurred');
    }
  }

  async findAll(): Promise<User[]> {
    return this._userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this._userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this._userRepository.findOne({ where: { email }, select: ['id', 'email', 'name', 'password', 'role'] });
  }
}
