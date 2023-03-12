import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// Auth
import { AuthGuard } from '@nestjs/passport';
import { AuthJWTDTO } from 'src/api/auth/auth.dto';
// Services
import { UsersCreateService } from './services/users.create.service';
import { UsersDeleteService } from './services/users.delete.service';
import { UsersFindAllService } from './services/users.findAll.service';
import { UsersFindOneService } from './services/users.findOne.service';
import { UsersUpdateService } from './services/users.update.service';
// DTO
import { UserRequestDTO, UserUpdateRequestDTO } from './user.dto';

export const controllerPermissions = [
  'ADMINISTRADOR',
  'GESTOR',
  'COORDENADOR',
  'MASTER',
];

@Controller({
  path: 'users',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  request: any;
  constructor(
    private readonly createService: UsersCreateService,
    private readonly updateService: UsersUpdateService,
    private readonly findOneService: UsersFindOneService,
    private readonly findAllService: UsersFindAllService,
    private readonly deleteService: UsersDeleteService,
    private jwt: JwtService,
  ) {}

  userLogged(header: any) {
    /* 
      Verifica se o usuário é administrador
      Obtem o token da requisição
    */
    const token = String(header['authorization']).replace('Bearer ', '');
    // decodifica
    const decode = this.jwt.decode(token);
    // Cria o objeto
    const userJWT: AuthJWTDTO = {
      email: decode['name'],
      exp: decode['exp'],
      groups: decode['groups'],
      organizationId: decode['organizationId'],
      iat: decode['iat'],
    };
    return userJWT;
  }

  permissions(controllerGroups: string[], headers: any) {
    // Verifica se ele possui a permisssão de administrador
    let result = false;
    // Percorre as permissões do usuário
    const user = this.userLogged(headers);
    for (let i = 0; i < user.groups.length; i++) {
      const userGroup = user.groups[i].group.name;
      // Percorre as permissões do controller
      for (let j = 0; j < controllerGroups.length; j++) {
        const controllerGroup = controllerGroups[j];
        // Se existir ao menos uma permissão entre o controller e o usuário é retornado true
        if (userGroup === controllerGroup) {
          result = true;
        }
      }
    }

    // Se não existir grupos pertencetes a este controller é retornado um erro
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Sem permissão',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Post()
  create(@Body() createUserDto: UserRequestDTO, @Headers() headers: any) {
    this.permissions(controllerPermissions, headers);
    return this.createService.create(createUserDto);
  }

  @Get()
  findAll(@Headers() headers: any) {
    this.permissions(controllerPermissions, headers);
    return this.findAllService.findAll(this.userLogged(headers));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers: any) {
    this.permissions(controllerPermissions, headers);
    return this.findOneService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UserUpdateRequestDTO,
    @Headers() headers: any,
  ) {
    this.permissions(controllerPermissions, headers);
    return this.updateService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Headers() headers: any) {
    this.permissions(controllerPermissions, headers);
    return this.deleteService.delete();
  }
}
