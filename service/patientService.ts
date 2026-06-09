import { login } from "@/types/login";
import axiosService from "../lib/axios"
import { forgotPassword } from "@/types/forgotPassword";
import { verifyEmail } from "@/types/verifyEmail";
import { PATIENTS_ENDPOINTS } from "@/lib/endpoints";
import { Signup } from "@/lib/interface/signup-interface";
import { CreateHealth } from "@/lib/interface/create-health-interface";

export const patientService = {
  login: async (payload: login) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.LOGIN, payload); 
    // this returns the data because interceptor returns response.data
  },
  signup: async (payload: Signup) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.SIGNUP, payload); 
  },
  forgotPassword: async (payload: forgotPassword) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.FORGOT_PASSWORD, payload); 
  },
  verifyEmail: async (email: string | undefined, payload: verifyEmail ) => {
    return await axiosService().post(`${PATIENTS_ENDPOINTS.VERIFY_EMAIL}${email}`, payload); 
  },
  // createHealth: async (payload: CreateHealth) => {
  //   return await axiosService().post(PATIENTS_ENDPOINTS.CREATE_HEALTH, payload); 
  // },
  getUser: async () => {
    const response = await axiosService().get(PATIENTS_ENDPOINTS.USER)
    return await response.data
  }
}
