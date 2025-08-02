import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/CreateUserDto.dto';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request & { user: User }): { access_token: string; user: Omit<User, 'password'> } {
    return this._authService.login(req.user);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<{ access_token: string; user: Omit<User, 'password'> }> {
    return await this._authService.register(body);
  }
}
