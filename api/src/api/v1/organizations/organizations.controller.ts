import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// DTO
import { OrganizationDTO } from './organizations.dto';
// Services
import { OrganizationsDeleteService } from './services/organization.delete.service';
import { OrganizationsFindAllService } from './services/organization.findAll.service';
import { OrganizationsFindOneService } from './services/organization.findOne.service';
import { OrganizationsUpdateService } from './services/organization.update.service';
import { OrganizationsCreateService } from './services/organizations.create.service';

@Controller({
  path: 'organizations',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class OrganizationController {
  constructor(
    private readonly createService: OrganizationsCreateService,
    private readonly updateService: OrganizationsUpdateService,
    private readonly deleteService: OrganizationsDeleteService,
    private readonly findOneService: OrganizationsFindOneService,
    private readonly findAllService: OrganizationsFindAllService,
  ) {}

  @Post()
  async create(@Body() data: OrganizationDTO) {
    return this.createService.create(data);
  }

  @Get()
  async findAll() {
    return this.findAllService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.findOneService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: OrganizationDTO) {
    return this.updateService.update(Number(id), data);
  }

  @Delete(':id')
  async delete() {
    return this.deleteService.delete();
  }
}
