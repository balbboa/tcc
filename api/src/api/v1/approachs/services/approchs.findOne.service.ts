import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ApproachFindOneService {
  constructor(private prisma: PrismaService) {}
  // Obtem uma abordagem
  async findOne(id: number) {
    const approachs = await this.prisma.approachs.findUnique({
      where: {
        id: id,
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            organizations: true,
          },
        },
      },
    });

    if (!approachs) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Esta Abordagem não existe',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return approachs;
  }
}
