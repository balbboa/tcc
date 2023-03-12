import { Module } from '@nestjs/common';
// Controllers
import { AuthController } from './auth.controller';
// JWT
import { JwtModule } from '@nestjs/jwt';
// Passport
import { PassportModule } from '@nestjs/passport';
// Module
import { UsersModule } from '../v1/users/users.module';
// Services
import { UsersFindByEmailService } from '../v1/users/services/user.findByEmail.service';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/database/PrismaService';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersFindByEmailService,
    PrismaService,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
