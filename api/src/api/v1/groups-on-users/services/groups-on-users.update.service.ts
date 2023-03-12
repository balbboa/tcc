import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { GroupsOnUsersDTO } from '../groups-on-users.dto';

@Injectable()
export class GroupsOnUsersUpdateService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: GroupsOnUsersDTO) {
    // Verifica se já existe este usuário com o grupo
    const groupsOnUsersExists = await this.prisma.groupsOnUsers.findFirst({
      where: {
        userId: data.userId,
        groupId: data.groupId,
      },
    });
    // Retorna o erro
    if (groupsOnUsersExists) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Já existe um usuário com este grupo',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // Realiza o UPDATE
    try {
      return await this.prisma.groupsOnUsers.update({
        data,
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
