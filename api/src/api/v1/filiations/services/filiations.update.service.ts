import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FiliationsDTO } from '../filiations.dto';

@Injectable()
export class FiliationsUpdateService {
  constructor(private prisma: PrismaService) {}

  // Atualiza a filiação
  async update(id: number, data: FiliationsDTO) {
    const filiationExists = await this.prisma.filiations.findUnique({
      where: {
        id,
      },
    });

    if (!filiationExists) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Esta filiação não existe',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.filiations.update({
      data,
      where: {
        id,
      },
    });
  }
}
