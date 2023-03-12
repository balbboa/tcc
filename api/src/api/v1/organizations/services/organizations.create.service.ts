import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { OrganizationDTO } from '../organizations.dto';

@Injectable()
export class OrganizationsCreateService {
  constructor(private prisma: PrismaService) {}

  // Cria uma nova organização
  async create(data: OrganizationDTO) {
    try {
      const organizationExists = await this.prisma.organizations.findFirst({
        where: {
          name: data.name,
        },
      });
      if (organizationExists) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Esta organização ja existe',
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

    const organization = await this.prisma.organizations.create({
      data,
    });

    return organization;
  }
}
