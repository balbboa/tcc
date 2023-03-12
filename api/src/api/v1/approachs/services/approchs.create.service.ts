import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ApproachRequestDTO, IPhotoRegisterDTO } from '../approachs.dto';

@Injectable()
export class ApproachCreateService {
  constructor(private prisma: PrismaService) {}

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
      const approachPhotos: IPhotoRegisterDTO[] = [];
      if (data.photos) {
        // Organiza as imagens da abordagem de acordo com a ORM
        const approchRequestPhotos = data.photos.filter(
          (photo) => photo.type === 'Materiabilidade',
        );
        for (let i = 0; i < approchRequestPhotos.length; i++) {
          const photo = approchRequestPhotos[i];
          approachPhotos.push({
            url: photo.path,
            description: photo.description,
            type: photo.type,
            userId: data.userId,
          });
        }
      }

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
          address: data.address
            ? {
                create: {
                  userId: data.userId,
                  city: data.address.city,
                  district: data.address.district,
                  number: data.address.number,
                  state: data.address.state,
                  street: data.address.street,
                },
              }
            : undefined,
          latitude: data.latitude,
          longitude: data.longitude,
          photos: {
            createMany: { data: approachPhotos },
          },
        },
      });

      // Cadastra as pessoas
      if (data.people) {
        for await (const people of data.people) {
          // Prepara as fotos da pessoa de acordo com a ORM
          const peoplePhotos: IPhotoRegisterDTO[] = [];
          if (people.photos) {
            for (let i = 0; i < people.photos.length; i++) {
              const photo = people.photos[i];
              peoplePhotos.push({
                url: photo.path,
                description: photo.description,
                type: photo.type,
                userId: data.userId,
              });
            }
          }

          // Cria a pessoa
          await this.prisma.peoples.create({
            data: {
              users: {
                connect: {
                  id: data.userId,
                },
              },
              organizations: {
                connect: {
                  id: people.organizationsId,
                },
              },
              name: people.name,
              aka: people.aka,
              birthday: people.birthday,
              motherName: people.motherName,
              sex: people.sex,
              document: people.document,
              address: {
                create: people.address
                  ? {
                      userId: data.userId,
                      city: people.address.city,
                      district: people.address.district,
                      number: people.address.number,
                      state: people.address.state,
                      street: people.address.street,
                    }
                  : undefined,
              },
              photos: {
                createMany: { data: peoplePhotos },
              },
              filiations: {
                connect: {
                  id: people.filiation,
                },
              },
              approachs: {
                connect: {
                  id: approachs.id,
                },
              },
            },
          });
        }
      }
      if (data.vehicles) {
        // Cadastra os veículos
        for await (const vehicle of data.vehicles) {
          // Prepara as fotos da pessoa de acordo com a ORM
          const vehiclePhotos: IPhotoRegisterDTO[] = [];
          if (vehicle.photos) {
            const vehicleRequestPhotos = vehicle.photos.filter(
              (photo) => photo.type === 'Veículo',
            );
            for (let i = 0; i < vehicleRequestPhotos.length; i++) {
              const photo = vehicleRequestPhotos[i];
              vehiclePhotos.push({
                url: photo.path,
                description: photo.description,
                type: photo.type,
                userId: data.userId,
              });
            }
          }

          // Cria o veículo
          await this.prisma.vehicles.create({
            data: {
              plate: vehicle.plate,
              users: {
                connect: {
                  id: data.userId,
                },
              },
              photos: {
                createMany: { data: vehiclePhotos },
              },
              approachs: {
                connect: {
                  id: approachs.id,
                },
              },
            },
          });
        }
      }

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
