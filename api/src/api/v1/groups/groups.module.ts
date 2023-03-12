import { Module } from '@nestjs/common';
// Prisma
import { PrismaService } from 'src/database/PrismaService';
// Controllers
import { GroupsController } from './groups.controller';
// Services
import { GroupsCreateService } from './services/groups.create.service';
import { GroupsDeleteService } from './services/groups.delete.service';
import { GroupsFindAllService } from './services/groups.findAll.service';
import { GroupsFindOneService } from './services/groups.findOne.service';
import { GroupsUpdateService } from './services/groups.update.service';
@Module({
  controllers: [GroupsController],
  providers: [
    PrismaService,
    GroupsCreateService,
    GroupsDeleteService,
    GroupsFindAllService,
    GroupsFindOneService,
    GroupsUpdateService,
  ],
})
export class GroupsModule {}
