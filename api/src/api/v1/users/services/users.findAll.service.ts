import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthJWTDTO } from 'src/api/auth/auth.dto';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from '../user.dto';

@Injectable()
export class UsersFindAllService {
  constructor(private prisma: PrismaService) {}

  // Lista todos os usuários
  async findAll(user: AuthJWTDTO) {
    // Verifica se o usuário é administrador geral
    const userADM = user.groups.filter(
      (userGroup) => userGroup.group.name === 'MASTER',
    );
    /* 
    Se o usuário for administrador geral, a query é indefinida (todos), 
    se não, retorna apenas sua organização e os usuários dos grupos em que ele percente
    */
    interface IFilterGroups {
      groups: {
        some: {
          groupId: number;
        };
      };
    }
    const filterGroups: IFilterGroups[] = [];

    // Cria a query de grupos dinamicamente
    user.groups.map((data) => {
      filterGroups.push({
        groups: {
          some: {
            groupId: data.group.id,
          },
        },
      });
    });

    try {
      const users = await this.prisma.users.findMany({
        where: {
          organizationId:
            userADM.length === 1 ? undefined : user.organizationId,
          OR: filterGroups,
        },
        include: {
          organizations: true,
          groups: {
            select: {
              group: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
      const userList: UserDTO[] = users.map((user) => {
        delete user.password;
        // Converte as datas para UTC
        const tmp = {
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
        return tmp;
      });

      return {
        count: userList.length,
        users: userList,
      };
    } catch (error) {
      console.log('======start======');
      console.log(error);
      console.log('======end======');
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro ao listar os usuários',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
