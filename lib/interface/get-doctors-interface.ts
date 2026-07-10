export interface DoctorHospital {
  id: number;
  hospitalName: string;
  email?: string;
}

export interface DoctorProfile {
  specialization?: string | null;
  consultationFee?: number | string | null;
  profileImage?: string | null;
  bio?: string | null;
  yearsOfExperience?: number | string | null;
}

export interface GetDoctor {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  email?: string | null;
  profileImage?: string | null;
  image?: string | null;
  profile?: DoctorProfile | null;
  hospital?: DoctorHospital | null;
}

export interface GetDoctorsResponse {
  data: GetDoctor[];
  message: string;
}
