// Interfaces

export default function empty() {
  return "";
}
export interface IUserRegister {
  id?: number;
  name: string;
  email: string;
  status: boolean;
  password?: string;
  registration: string;
  organizationId: number;
  groups: IGroupsRegister[];
}

export interface IUserRequest {
  id: number;
  name: string;
  email: string;
  registration: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  organizationId: number;
  organizations: {
    id: number;
    name: string;
  };
  groups: [
    {
      group: {
        id: number;
        name: string;
      };
    }
  ];
}

export interface IUsersRequest {
  count: number;
  users: IUserRequest[];
}

export interface IGroupsRegister {
  group: {
    userId: number;
    groupId: number;
  };
}
