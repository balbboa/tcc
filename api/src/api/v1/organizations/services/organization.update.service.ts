import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { OrganizationDTO } from '../organizations.dto';

@Injectable()
export class OrganizationsUpdateService {
  constructor(private prisma: PrismaService) {}

  // Atualiza a organização
  async update(id: number, data: OrganizationDTO) {
    try {
      const organizationExists = await this.prisma.organizations.findUnique({
        where: {
          id,
        },
      });

      if (!organizationExists) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Esta organização não existe',
          },
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Atualiza a organização
    return await this.prisma.organizations.update({
      data,
      where: {
        id,
      },
    });
  }
}
