import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { OrganizationController } from './organizations.controller';
import { OrganizationsDeleteService } from './services/organization.delete.service';
import { OrganizationsFindAllService } from './services/organization.findAll.service';
import { OrganizationsFindOneService } from './services/organization.findOne.service';
import { OrganizationsUpdateService } from './services/organization.update.service';
import { OrganizationsCreateService } from './services/organizations.create.service';

@Module({
  controllers: [OrganizationController],
  providers: [
    PrismaService,
    OrganizationsCreateService,
    OrganizationsDeleteService,
    OrganizationsFindAllService,
    OrganizationsFindOneService,
    OrganizationsDeleteService,
    OrganizationsUpdateService,
  ],
})
export class OrganizationsModule {}
