import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// Services
import { ApproachCreateService } from './services/approchs.create.service';
import { ApproachDeleteService } from './services/approchs.delete.service';
import { ApproachFindAllService } from './services/approchs.findAll.service';
import { ApproachFindOneService } from './services/approchs.findOne.service';
import { ApproachUpdateService } from './services/approchs.update.service';
// DTO
import { ApproachRequestDTO } from './approachs.dto';
import { Approachs } from '@prisma/client';

@Controller({
  path: 'approachs',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class ApproachsController {
  constructor(
    private readonly createService: ApproachCreateService,
    private readonly updateService: ApproachUpdateService,
    private readonly deleteService: ApproachDeleteService,
    private readonly findAllService: ApproachFindAllService,
    private readonly findOneService: ApproachFindOneService,
  ) {}

  @Post()
  create(@Body() data: ApproachRequestDTO) {
    return this.createService.create(data);
  }

  @Get()
  findAll(
    @Query('status') status: string,
    @Query('organizationId') organizationId?: number,
  ) {
    return this.findAllService.findAll(status, organizationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Approachs) {
    return this.updateService.update(+id, data);
  }

  @Delete(':id')
  delete() {
    return this.deleteService.delete();
  }
}
