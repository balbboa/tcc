import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FiliationsDTO } from '../filiations.dto';

@Injectable()
export class FiliationsCreateService {
  constructor(private prisma: PrismaService) {}

  // Cria uma nova filiação
  async create(data: FiliationsDTO) {
    const filliationsExists = await this.prisma.filiations.findFirst({
      where: {
        name: data.name,
      },
    });

    if (filliationsExists) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Esta filiação ja existe',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const filiation = await this.prisma.filiations.create({
      data,
    });

    return filiation;
  }
}
