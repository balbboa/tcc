import { Module } from '@nestjs/common';
// Controller
import { UsersController } from './users.controller';
// Prisma
import { PrismaService } from 'src/database/PrismaService';
// Services
import { UsersCreateService } from './services/users.create.service';
import { UsersDeleteService } from './services/users.delete.service';
import { UsersFindAllService } from './services/users.findAll.service';
import { UsersFindOneService } from './services/users.findOne.service';
import { UsersUpdateService } from './services/users.update.service';
import { AuthService } from 'src/api/auth/auth.service';
import { UsersFindByEmailService } from './services/user.findByEmail.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersCreateService,
    UsersDeleteService,
    UsersFindAllService,
    UsersFindOneService,
    UsersFindByEmailService,
    UsersUpdateService,
    AuthService,
    JwtService,
  ],
})
export class UsersModule {}
