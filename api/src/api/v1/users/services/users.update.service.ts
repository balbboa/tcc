import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserUpdateDTO, UserUpdateRequestDTO } from '../user.dto';
import * as bcrypt from 'bcryptjs';
import { GroupsOnUsersDTO } from '../../groups-on-users/groups-on-users.dto';

@Injectable()
export class UsersUpdateService {
  constructor(private prisma: PrismaService) {}

  // Atualiza a usuário
  async update(id: number, data: UserUpdateRequestDTO) {
    const { groups } = data;

    // Atualiza os grupos

    // atualiza os grupos
    if (groups) {
      // deleta os existentes
      if (groups.length > 0) {
        await this.prisma.groupsOnUsers.deleteMany({
          where: {
            userId: id,
          },
        });
        // Cria os novos grupos
        // Converte no formado to Prisma
        const groupsTMP: GroupsOnUsersDTO[] = [];
        groups.map((group) => {
          groupsTMP.push(group.group);
        });
        await this.prisma.groupsOnUsers.createMany({
          data: groupsTMP,
        });
      }
    }

    // Remove os grupos da requisição
    delete data.groups;
    // Ontem os dados apenas do usuário
    const user: UserUpdateDTO = data;
    // Atualiza o usuário
    const userExists = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Esta usuário não existe',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    // Encripta a senha
    if (user.password) {
      const saltOrRounds = 10;
      user.password = await bcrypt.hash(user.password, saltOrRounds);
    }

    const userUpdate = await this.prisma.users.update({
      data: user,
      where: {
        id,
      },
    });

    // deleta o usuário
    delete userUpdate.password;

    return userUpdate;
  }
}
