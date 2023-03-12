import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class FiliationsFindOneService {
  constructor(private prisma: PrismaService) {}
  // Obtem uma filiação
  async findOne(id: number) {
    const filiations = await this.prisma.filiations.findUnique({
      where: {
        id: id,
      },
    });

    if (!filiations) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Esta Filiação não existe',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return filiations;
  }
}
