import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ApproachRequestDTO } from '../approachs.dto';

@Injectable()
export class ApproachCreateService {
  constructor(private prisma: PrismaService) { }

  // Cria uma nova abordagem,
  async create(data: ApproachRequestDTO) {
    // Verifica se a latitude e a longitude existe
    try {
      if (data.latitude.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Você precisa informar a localização',
          },
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Você precisa informar a localização',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    try {

      // Cria a abordagem
      const approachs = await this.prisma.approachs.create({
        data: {
          users: {
            connect: {
              id: data.userId,
            },
          },
          organizations: {
            connect: {
              id: data.organizationsId,
            },
          },
          description: data.description,
          city: data.city,
          district: data.district,
          number: data.number,
          state: data.state,
          street: data.street,
          latitude: data.latitude,
          longitude: data.longitude,
        },
      });

      return approachs;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Ocorreu um erro ao tentar cadastrar a abordagem',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
