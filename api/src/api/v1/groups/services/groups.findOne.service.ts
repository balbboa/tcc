import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class GroupsFindOneService {
  constructor(private prisma: PrismaService) {}
  // Obtem um grupo
  async findOne(id: number) {
    const group = await this.prisma.groups.findUnique({
      where: {
        id: id,
      },
    });

    if (!group) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Este grupo não existe',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return group;
  }
}
