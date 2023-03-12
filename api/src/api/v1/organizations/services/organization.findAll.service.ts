import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class OrganizationsFindAllService {
  constructor(private prisma: PrismaService) {}

  // Lista todas as organizações
  async findAll() {
    const organizations = await this.prisma.organizations.findMany({
      orderBy: { id: 'desc' },
    });
    return {
      count: organizations.length,
      organizations: organizations,
    };
  }
}
