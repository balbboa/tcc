import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// DTO
import { FiliationsDTO } from './filiations.dto';
// Services
import { FiliationsCreateService } from './services/filiations.create.service';
import { FiliationsDeleteService } from './services/filiations.delete.service';
import { FiliationsFindAllService } from './services/filiations.findAll.service';
import { FiliationsFindOneService } from './services/filiations.findOne.service';
import { FiliationsUpdateService } from './services/filiations.update.service';

@Controller({
  path: 'filiations',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class FiliationsController {
  constructor(
    private readonly createService: FiliationsCreateService,
    private readonly updateService: FiliationsUpdateService,
    private readonly deleteService: FiliationsDeleteService,
    private readonly findAllService: FiliationsFindAllService,
    private readonly findOneService: FiliationsFindOneService,
  ) {}

  @Post()
  create(@Body() data: FiliationsDTO) {
    return this.createService.create(data);
  }

  @Get()
  findAll() {
    return this.findAllService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: FiliationsDTO) {
    return this.updateService.update(+id, data);
  }

  @Delete(':id')
  delete() {
    return this.deleteService.delete();
  }
}
