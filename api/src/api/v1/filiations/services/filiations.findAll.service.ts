import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FiliationsDTO } from '../filiations.dto';

@Injectable()
export class FiliationsFindAllService {
  constructor(private prisma: PrismaService) {}
  // Lista todas as filiações
  async findAll() {
    const getFiliations = await this.prisma.filiations.findMany();
    const filiations: FiliationsDTO[] = getFiliations.map((filiation) => {
      // Converte as datas para UTC
      const tmp = {
        ...filiation,
        createdAt: filiation.createdAt.toLocaleString('pt-BR', {
          timeZone: 'America/Recife',
        }),
        updatedAt:
          filiation.updatedAt &&
          filiation.updatedAt.toLocaleString('pt-BR', {
            timeZone: 'America/Recife',
          }),
      };
      return tmp;
    });
    return {
      count: filiations.length,
      filiations: filiations,
    };
  }
}
