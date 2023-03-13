import { Module } from '@nestjs/common';
import { OrganizationsModule } from './api/v1/organizations/organizations.module';
import { GroupsModule } from './api/v1/groups/groups.module';
import { UsersModule } from './api/v1/users/users.module';
import { GroupsOnUsersModule } from './api/v1/groups-on-users/groups-on-users.module';
import { AuthModule } from './api/auth/auth.module';
import { ApproachsModule } from './api/v1/approachs/approachs.module';
import { UploadsModule } from './api/v1/uploads/uploads.module';

@Module({
  imports: [
    OrganizationsModule,
    GroupsModule,
    UsersModule,
    GroupsOnUsersModule,
    AuthModule,
    ApproachsModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
