import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class OrganizationsFindOneService {
  constructor(private prisma: PrismaService) {}

  // Obtem uma organização
  async findOne(id: number) {
    const organization = await this.prisma.organizations.findUnique({
      where: {
        id: id,
      },
    });

    if (!organization) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Esta organização não existe',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return organization;
  }
}
