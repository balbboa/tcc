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
import { GroupsOnUsersDTO } from './groups-on-users.dto';
import { GroupsOnUsersCreateService } from './services/groups-on-users.create.service';
import { GroupsOnUsersDeleteService } from './services/groups-on-users.delete.service';
import { GroupsOnUsersFindAllService } from './services/groups-on-users.findAll.service';
import { GroupsOnUsersFindOneService } from './services/groups-on-users.findOne.service';
import { GroupsOnUsersUpdateService } from './services/groups-on-users.update.service';

@Controller({
  path: 'groups_users',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class GroupsOnUsersController {
  constructor(
    private readonly groupsOnUsersCreateService: GroupsOnUsersCreateService,
    private readonly groupsOnUsersDeleteService: GroupsOnUsersDeleteService,
    private readonly groupsOnUsersFindAllService: GroupsOnUsersFindAllService,
    private readonly groupsOnUsersFindOneService: GroupsOnUsersFindOneService,
    private readonly groupsOnUsersUpdateService: GroupsOnUsersUpdateService,
  ) {}

  @Post()
  create(@Body() data: GroupsOnUsersDTO) {
    return this.groupsOnUsersCreateService.create(data);
  }

  @Get()
  findAll() {
    return this.groupsOnUsersFindAllService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsOnUsersFindOneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: GroupsOnUsersDTO) {
    return this.groupsOnUsersUpdateService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsOnUsersDeleteService.delete(+id);
  }
}
