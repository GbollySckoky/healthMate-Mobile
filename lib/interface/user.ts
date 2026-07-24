export interface EditProfile {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    healthCondition: string;
    allergies: string;
    profilePicture: string;
}

export interface Profile {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    healthCondition: string;
    allergies: string;
    profilePicture: string;
}

export interface UserProfile {
  allergies: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  healthCondition: string;
  profilePicture: string;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: string; 
  updatedAt: string;
  profile: UserProfile;
}


