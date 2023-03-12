import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Approachs } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ApproachUpdateService {
  constructor(private prisma: PrismaService) {}

  // Atualiza a filiação
  async update(id: number, data: Approachs) {
    const approachExists = await this.prisma.approachs.findUnique({
      where: {
        id,
      },
    });

    if (!approachExists) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Esta abordagem não existe',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.approachs.update({
      data,
      where: {
        id,
      },
    });
  }
}
