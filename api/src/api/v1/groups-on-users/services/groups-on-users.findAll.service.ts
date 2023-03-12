import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class GroupsOnUsersFindAllService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const groupsOnUsers = await this.prisma.groupsOnUsers.findMany();
    return {
      count: groupsOnUsers.length,
      groupsOnUsers: groupsOnUsers,
    };
  }
}
