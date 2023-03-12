import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FiliationsController } from './filiations.controller';
import { FiliationsCreateService } from './services/filiations.create.service';
import { FiliationsDeleteService } from './services/filiations.delete.service';
import { FiliationsFindAllService } from './services/filiations.findAll.service';
import { FiliationsFindOneService } from './services/filiations.findOne.service';
import { FiliationsUpdateService } from './services/filiations.update.service';

@Module({
  controllers: [FiliationsController],
  providers: [
    PrismaService,
    FiliationsCreateService,
    FiliationsDeleteService,
    FiliationsFindAllService,
    FiliationsFindOneService,
    FiliationsUpdateService,
  ],
})
export class FiliationsModule {}
