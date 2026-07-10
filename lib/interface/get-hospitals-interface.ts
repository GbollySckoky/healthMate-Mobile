import { PaginationMeta } from './get-appointments-interface';

export interface GetHospital {
  id: number;
  hospitalName: string;
  email: string;
  phoneNumber: string;
  profile: string | null;
  dateOfEstablishment: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetHospitalsResponse {
  data: GetHospital[];
  message: string;
  meta: PaginationMeta;
}
