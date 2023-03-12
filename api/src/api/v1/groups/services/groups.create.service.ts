import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { GroupsDTO } from '../groups.dto';

@Injectable()
export class GroupsCreateService {
  constructor(private prisma: PrismaService) {}

  // Cria um novo grupo
  async create(data: GroupsDTO) {
    const groupExists = await this.prisma.groups.findFirst({
      where: {
        name: data.name,
      },
    });

    if (groupExists) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Este grupo ja existe',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const group = await this.prisma.groups.create({
      data,
    });

    return group;
  }
}
