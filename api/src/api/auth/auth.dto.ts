export class AuthDTO {
  email: string;
  password: string;
}
export class AuthJWTDTO {
  email: string;
  groups: [{ group: { id: number; name: string } }];
  organizationId: number;
  iat: number;
  exp: number;
}
