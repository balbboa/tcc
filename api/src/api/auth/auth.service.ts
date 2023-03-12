import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersFindByEmailService } from '../v1/users/services/user.findByEmail.service';
import { AuthDTO } from './auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersFindByEmailService,
    private readonly jwtService: JwtService,
  ) {}

  async login(auth: AuthDTO) {
    const user = await this.userService.findByEmail(auth.email);
    // Remove a senha
    delete user.password;
    return {
      user: user,
      token: this.jwtService.sign({
        email: user.email,
        groups: user.groups,
        organizationId: user.organizationId,
      }),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
