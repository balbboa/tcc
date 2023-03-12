import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationsDeleteService {
  // Retorna a informação que não se pode deletar organizações
  async delete() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Não é possível excluir organizações',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
