import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
@Injectable()
export class UsersFindByEmailService {
  constructor(private prisma: PrismaService) {}
  // Obtem um usuário
  async findByEmail(email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email,
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
