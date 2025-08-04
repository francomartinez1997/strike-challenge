import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Role } from './role/entities/role.entity';
import { Vulnerability } from './vulnerabilities/entities/vulnerabilities.entity';
import { VulnerabilitiesModule } from './vulnerabilities/vulnerabilities.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // docker
      // host: 'localhost', // local
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'strikechallenge',
      entities: [User, Role, Vulnerability],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    VulnerabilitiesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
