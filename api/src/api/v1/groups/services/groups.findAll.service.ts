import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class GroupsFindAllService {
  constructor(private prisma: PrismaService) {}
  // Lista todos os grupos
  async findAll() {
    const groups = await this.prisma.groups.findMany();
    return {
      count: groups.length,
      groups: groups,
    };
  }
}
