import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { GroupsDTO } from '../groups.dto';

@Injectable()
export class GroupsUpdateService {
  constructor(private prisma: PrismaService) {}

  // Atualiza a grupo
  async update(id: number, data: GroupsDTO) {
    const groupExists = await this.prisma.groups.findUnique({
      where: {
        id,
      },
    });

    if (!groupExists) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Este grupo não existe',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.groups.update({
      data,
      where: {
        id,
      },
    });
  }
}
