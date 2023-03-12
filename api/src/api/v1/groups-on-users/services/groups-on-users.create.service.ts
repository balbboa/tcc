import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { GroupsOnUsersDTO } from '../groups-on-users.dto';

@Injectable()
export class GroupsOnUsersCreateService {
  constructor(private prisma: PrismaService) {}

  // Vincula um grupo ao usuário
  async create(data: GroupsOnUsersDTO) {
    // Verifica se já existe um usuário com este grupo
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
    // Cria o relacionamento
    try {
      return await this.prisma.groupsOnUsers.create({
        data,
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
