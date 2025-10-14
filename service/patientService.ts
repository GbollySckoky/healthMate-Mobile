import { login } from "@/types/login";
import axiosService from "../lib/axios"
import { signup } from "@/types/signup";
import { forgotPassword } from "@/types/forgotPassword";
import { verifyEmail } from "@/types/verifyEmail";

export const patientService = {
  login: async (payload: login) => {
    return await axiosService().post(`auth/login/`, payload); 
    // this returns the data because interceptor returns response.data
  },
  signup: async (payload: signup) => {
    return await axiosService().post(`auth/signup/`, payload); 
  },
  forgotPassword: async (payload: forgotPassword) => {
    return await axiosService().post(`auth/forgot-password/`, payload); 
  },
  verifyEmail: async (payload: verifyEmail) => {
    return await axiosService().post(`auth/verify-email/`, payload); 
  },
}
