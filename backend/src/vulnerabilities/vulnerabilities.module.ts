import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VulnerabilitiesController } from './vulnerabilities.controller';
import { VulnerabilitiesService } from './vulnerabilities.service';
import { Vulnerability } from './entities/vulnerabilities.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Vulnerability])],
  controllers: [VulnerabilitiesController],
  providers: [VulnerabilitiesService],
  exports: [VulnerabilitiesService],
})
export class VulnerabilitiesModule {}
