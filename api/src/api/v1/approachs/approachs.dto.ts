export type ApproachRequestDTO = {
  id: string;
  userId: number;
  description: string;
  latitude: string;
  longitude: string;
  organizationsId: number;
  approachId?: string;
  street: string;
  district: string;
  number: string;
  city: string;
  state: string;
};
