export type AppointmentStatus = 'PENDING' | 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | string;

export interface AppointmentDoctor {
  id?: number;
  firstName?: string;
  lastName?: string;
  name?: string;
  fullName?: string;
  specialty?: string;
  specialization?: string;
  profileImage?: string | null;
  image?: string | null;
}

export interface AppointmentUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface GetAppointment {
  id: number;
  amount: number;
  consultationType: string;
  createdAt: string;
  date: string;
  doctor: AppointmentDoctor | null;
  healthConcern: string;
  note: string | null;
  status: AppointmentStatus;
  time: string;
  user: AppointmentUser | null;
}

export interface PaginationMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface GetAppointmentsResponse {
  data: GetAppointment[];
  message: string;
  meta: PaginationMeta;
}
