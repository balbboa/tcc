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
import { GroupsDTO } from './groups.dto';
// Services
import { GroupsCreateService } from './services/groups.create.service';
import { GroupsDeleteService } from './services/groups.delete.service';
import { GroupsFindAllService } from './services/groups.findAll.service';
import { GroupsFindOneService } from './services/groups.findOne.service';
import { GroupsUpdateService } from './services/groups.update.service';

@Controller({
  path: 'groups',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class GroupsController {
  constructor(
    private readonly createService: GroupsCreateService,
    private readonly updateService: GroupsUpdateService,
    private readonly deleteService: GroupsDeleteService,
    private readonly findAllService: GroupsFindAllService,
    private readonly findOneService: GroupsFindOneService,
  ) {}

  @Post()
  create(@Body() data: GroupsDTO) {
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
  update(@Param('id') id: string, @Body() data: GroupsDTO) {
    return this.updateService.update(+id, data);
  }

  @Delete(':id')
  delete() {
    return this.deleteService.delete();
  }
}
