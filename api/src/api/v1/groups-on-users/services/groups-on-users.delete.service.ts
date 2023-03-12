import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class GroupsOnUsersDeleteService {
  constructor(private prisma: PrismaService) {}

  // Deleta o relacionamento
  async delete(id: number) {
    const groupsOnUsers = await this.prisma.groupsOnUsers.findUnique({
      where: {
        id: id,
      },
    });
    if (!groupsOnUsers) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Não existe grupos para este usuário',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.prisma.groupsOnUsers.delete({
      where: {
        id: id,
      },
    });
  }
}
