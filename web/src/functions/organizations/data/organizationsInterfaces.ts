export interface IOrganizationRegister {
  id?: number;
  name: string;
}

export interface IOrganizationRequest {
  count: number;
  organizations: IOrganizationRegister[];
}

export default function empty() {
  return "";
}
