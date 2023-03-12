import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO, UserRequestDTO } from '../user.dto';
import * as bcrypt from 'bcryptjs';
import { GroupsOnUsersDTO } from '../../groups-on-users/groups-on-users.dto';

@Injectable()
export class UsersCreateService {
  constructor(private prisma: PrismaService) {}

  // Cria um novo usuário
  async create(data: UserRequestDTO) {
    // Obtem os grupos
    const { groups } = data;

    // Verifica se existe um usuário com este mesmo email
    const usersEmailExists = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    // Retorna um erro caso exista o usuário com este email
    if (usersEmailExists) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Existe um usuário com este Email',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    // Encripta a senha
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);

    // Remove os grupos
    delete data.groups;
    // Cria um novo usuário
    const createUser: UserDTO = data;
    try {
      const user = await this.prisma.users.create({
        data: createUser,
      });

      // deleta o usuário
      delete user.password;

      // Cria os grupos do usuário
      if (user) {
        // Converte no formado to Prisma
        const groupsTMP: GroupsOnUsersDTO[] = [];
        groups.map((data) => {
          const { group } = data;
          groupsTMP.push({
            groupId: group.groupId,
            userId: user.id,
          });
        });
        await this.prisma.groupsOnUsers.createMany({
          data: groupsTMP,
        });
      }

      return user;
    } catch (error) {
      console.log('======start======');
      console.log(error);
      console.log('======end======');
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro ao salvar o usuário',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
