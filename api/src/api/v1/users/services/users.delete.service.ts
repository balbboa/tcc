import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UsersDeleteService {
  // Retorna a informação que não se pode deletar usuários
  async delete() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Não é possível excluir usuários',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
