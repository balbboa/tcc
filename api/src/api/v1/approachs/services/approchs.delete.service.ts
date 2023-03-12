import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ApproachDeleteService {
  constructor(private prisma: PrismaService) {}

  // Retorna a informação que não se pode deletar a abordagem
  async delete() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Não é possível excluir grupos',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
