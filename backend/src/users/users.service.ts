import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './entities/CreateUserDto.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly _roleRepository: Repository<Role>
  ) {}
  private readonly users: User[] = [];

  private baseQuery() {
    return this._userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .select(['user.id', 'user.email', 'user.name', 'user.createdAt', 'user.updatedAt', 'role.id', 'role.name']);
  }

  async create(body: CreateUserDto): Promise<User> {
    const { roleId, ...userData } = body;

    const role = await this._roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException(`Role with id ${roleId} not found`);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this._userRepository.create({
      ...userData,
      password: hashedPassword,
      role,
    });

    const savedUser = await this._userRepository.save(user);

    return plainToInstance(User, savedUser);
  }

  async findAll(): Promise<User[]> {
    return this._userRepository.find();
  }
}
