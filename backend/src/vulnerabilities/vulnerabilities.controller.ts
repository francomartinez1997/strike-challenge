import { AuthGuard } from '@nestjs/passport';
import { CreateVulnerabilityDto } from './dto/CreateVulnerabilityDto.dto';
import { UpdateVulnerabilityDto } from './dto/UpdateVulnerabilityDto.dto';
import { Vulnerability } from './entities/vulnerabilities.entity';
import { VulnerabilitiesService } from './vulnerabilities.service';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

@Controller('vulnerabilities')
export class VulnerabilitiesController {
  constructor(private readonly _vulnerabilitiesService: VulnerabilitiesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Vulnerability[]> {
    const response = await this._vulnerabilitiesService.findAll();
    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vulnerability> {
    const response = await this._vulnerabilitiesService.findOne(id);
    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: CreateVulnerabilityDto): Promise<Vulnerability> {
    const response = await this._vulnerabilitiesService.create(body);
    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateVulnerabilityDto): Promise<Vulnerability> {
    const response = await this._vulnerabilitiesService.update(id, body);

    return response;
  }
}
