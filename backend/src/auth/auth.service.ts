import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/CreateUserDto.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private _usersService: UsersService,
    private _jwtService: JwtService
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this._usersService.findOneByEmail(email);
    if (!user) throw new BadRequestException('User not found');

    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new BadRequestException('Password is not correct');

    return user;
  }

  login(user: User): { access_token: string; user: Omit<User, 'password'> } {
    const payload = { email: user.email, id: user.id };

    const token = this._jwtService.sign(payload);

    const { password, ...userWithoutPassword } = user;

    return {
      access_token: token,
      user: userWithoutPassword,
    };
  }

  async register(user: CreateUserDto): Promise<{ access_token: string; user: Omit<User, 'password'> }> {
    const existingUser = await this._usersService.findOneByEmail(user.email);
    if (existingUser) throw new BadRequestException('email already exists');

    const createdUser = await this._usersService.create(user);

    return this.login(createdUser);
  }
}
