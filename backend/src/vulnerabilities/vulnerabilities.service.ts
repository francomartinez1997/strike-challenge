import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vulnerability } from './entities/vulnerabilities.entity';
import { CreateVulnerabilityDto } from './dto/CreateVulnerabilityDto.dto';
import { User } from '../users/entities/user.entity';
import { UpdateVulnerabilityDto } from './dto/UpdateVulnerabilityDto.dto';

@Injectable()
export class VulnerabilitiesService {
  constructor(
    @InjectRepository(Vulnerability)
    private readonly _vulnerabilityRepository: Repository<Vulnerability>,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>
  ) {}

  async create(body: CreateVulnerabilityDto): Promise<Vulnerability> {
    const { reporterId, assigneeId, ...vulnerabilitiesData } = body;

    const reporter = await this._userRepository.findOne({ where: { id: reporterId } });
    if (!reporter) {
      throw new NotFoundException(`Reporter user with id ${reporterId} not found`);
    }

    let assignee: User | undefined;
    if (assigneeId) {
      assignee = await this._userRepository.findOne({ where: { id: assigneeId } });
      if (!assignee) {
        throw new NotFoundException(`Assignee user with id ${assigneeId} not found`);
      }
    }

    const vulnerability = this._vulnerabilityRepository.create({
      ...vulnerabilitiesData,
      reporter,
      assignee,
    });

    try {
      return await this._vulnerabilityRepository.save(vulnerability);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(`Error creating vulnerability: ${error.message}`);
      throw new BadRequestException('Unexpected error occurred');
    }
  }

  async update(id: number, body: UpdateVulnerabilityDto): Promise<Vulnerability> {
    const existingVulnerability = await this._vulnerabilityRepository.findOne({ where: { id } });
    if (!existingVulnerability) {
      throw new NotFoundException(`Vulnerability with id ${id} not found`);
    }

    const { reporterId, assigneeId, ...updateData } = body;

    if (reporterId) {
      const reporter = await this._userRepository.findOne({ where: { id: reporterId } });
      if (!reporter) {
        throw new NotFoundException(`Reporter user with id ${reporterId} not found`);
      }
      existingVulnerability.reporter = reporter;
    }

    if (assigneeId) {
      const assignee = await this._userRepository.findOne({ where: { id: assigneeId } });
      if (!assignee) {
        throw new NotFoundException(`Assignee user with id ${assigneeId} not found`);
      }
      existingVulnerability.assignee = assignee;
    }

    Object.assign(existingVulnerability, updateData);

    try {
      return await this._vulnerabilityRepository.save(existingVulnerability);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(`Error updating vulnerability: ${error.message}`);
      throw new BadRequestException('Unexpected error occurred');
    }
  }

  async findAll(): Promise<Vulnerability[]> {
    return this._vulnerabilityRepository.find();
  }

  async findOne(id: number): Promise<Vulnerability> {
    const vulerabilites = await this._vulnerabilityRepository.findOne({ where: { id } });
    if (!vulerabilites) {
      throw new NotFoundException(`Vulerabilites with id ${id} not found`);
    }
    return vulerabilites;
  }
}
