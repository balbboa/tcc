import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UsersFindOneService {
  constructor(private prisma: PrismaService) {}
  // Obtem um usuário
  async findOne(id: number) {
    // Pesquisa o usuário
    const user = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
      include: {
        organizations: true,
        groups: {
          select: {
            group: true,
          },
        },
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Este usuário não existe',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // deleta a senha
    delete user.password;
    // Configura a hora
    const customUser = {
      ...user,
      createdAt: user.createdAt.toLocaleString('pt-BR', {
        timeZone: 'America/Recife',
      }),
      updatedAt:
        user.updatedAt &&
        user.updatedAt.toLocaleString('pt-BR', {
          timeZone: 'America/Recife',
        }),
    };

    return customUser;
  }
}
