export type ApproachRequestDTO = {
  id: string;
  userId: number;
  description?: string;
  latitude: string;
  longitude: string;
  organizationsId: number;
  address: IAddressRequestDTO;
  photos: IPhotoRequestDTO[];
  people: IPeopleRequest[];
  vehicles: IVehicleRequestDTO[];
};

export interface IAddressRequestDTO {
  id: string;
  userId: number;
  approachId?: string;
  peopleId?: string;
  street: string;
  district: string;
  number: string;
  city: string;
  state: string;
}

export interface IPhotoRequestDTO {
  id: string;
  userId: number;
  description?: string;
  path: string;
  type: string;
}

export interface IPeopleRequest {
  id: string;
  userId: number;
  organizationsId: number;
  name: string;
  aka: string;
  motherName: string;
  sex: string;
  birthday: string;
  filiation: number;
  document: string;
  address: IAddressRequestDTO;
  photos: IPhotoRequestDTO[];
}

export interface IVehicleRequestDTO {
  id: string;
  userId: number;
  plate: string;
  photos: IPhotoRequestDTO[];
}

// ORM
export interface IPhotoRegisterDTO {
  description?: string;
  userId: number;
  url: string;
  type?: string;
}

export interface IPeopleRegisterDTO {
  userId: number;
  name: string;
  aka: string;
  motherName: string;
  sex: string;
  birthday: string;
  filiationsId: number;
  document: string;
}
