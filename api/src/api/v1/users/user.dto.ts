import { GroupsOnUsersDTO } from '../groups-on-users/groups-on-users.dto';

export class UserDTO {
  id?: number;
  name: string;
  email: string;
  status: boolean;
  password: string;
  registration: string;
  organizationId: number;
}

export class UserUpdateDTO {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  status?: boolean;
  registration?: string;
  users?: any;
  organizationId?: number;
}

export class UserUpdateRequestDTO {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  status?: boolean;
  registration?: string;
  users?: any;
  organizationId?: number;
  groups?: [{ group: GroupsOnUsersDTO }];
}

export class UserRequestDTO {
  id?: number;
  name: string;
  email: string;
  password: string;
  status: boolean;
  registration: string;
  organizationId: number;
  groups?: [{ group: GroupsOnUsersDTO }];
}
