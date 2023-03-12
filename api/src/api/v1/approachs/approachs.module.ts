import { Module } from '@nestjs/common';
import { ApproachsController } from './approachs.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ApproachCreateService } from './services/approchs.create.service';
import { ApproachDeleteService } from './services/approchs.delete.service';
import { ApproachFindAllService } from './services/approchs.findAll.service';
import { ApproachFindOneService } from './services/approchs.findOne.service';
import { ApproachUpdateService } from './services/approchs.update.service';

@Module({
  controllers: [ApproachsController],
  providers: [
    PrismaService,
    ApproachCreateService,
    ApproachDeleteService,
    ApproachFindAllService,
    ApproachFindOneService,
    ApproachUpdateService,
  ],
})
export class ApproachsModule {}
