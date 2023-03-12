import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ApproachFindAllService {
  constructor(private prisma: PrismaService) {}
  // Lista todas as abordagens
  async findAll(status: string, organizationId: number) {
    const approachs = await this.prisma.approachs.findMany({
      where: {
        status: status === 'true',
        organizationsId: Number(organizationId),
      },
      include: {
        address: true,
        peoples: {
          include: {
            photos: true,
          },
        },
        photos: true,
        vehicles: {
          include: {
            photos: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            organizations: true,
          },
        },
      },
    });
    return {
      count: approachs.length,
      approachs: approachs,
    };
  }
}
