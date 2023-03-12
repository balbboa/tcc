import { Module } from '@nestjs/common';
// Controller
import { GroupsOnUsersController } from './groups-on-users.controller';
// Prisma
import { PrismaService } from 'src/database/PrismaService';
// Services
import { GroupsOnUsersCreateService } from './services/groups-on-users.create.service';
import { GroupsOnUsersDeleteService } from './services/groups-on-users.delete.service';
import { GroupsOnUsersFindAllService } from './services/groups-on-users.findAll.service';
import { GroupsOnUsersFindOneService } from './services/groups-on-users.findOne.service';
import { GroupsOnUsersUpdateService } from './services/groups-on-users.update.service';

@Module({
  controllers: [GroupsOnUsersController],
  providers: [
    PrismaService,
    GroupsOnUsersCreateService,
    GroupsOnUsersDeleteService,
    GroupsOnUsersFindAllService,
    GroupsOnUsersFindOneService,
    GroupsOnUsersUpdateService,
  ],
})
export class GroupsOnUsersModule {}
