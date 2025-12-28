import { login } from "@/types/login";
import axiosService from "../lib/axios"
import { forgotPassword } from "@/types/forgotPassword";
import { verifyEmail } from "@/types/verifyEmail";
import { PATIENTS_ENDPOINTS } from "@/lib/endpoints";
import { Signup } from "@/lib/interface/signup-interface";
import { CreateHealth } from "@/lib/interface/create-health-interface";
import { CreateAppointmet } from "@/lib/interface/create-appointment-interface";
import { BloodPressure } from "@/lib/interface/create-blood-pressure.interface";

export const patientService = {
  login: async (payload: login) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.LOGIN, payload); 
    // this returns the data because interceptor returns response.data
  },
  signup: async (payload: Signup) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.SIGNUP, payload); 
  },
  forgotPassword: async (payload: forgotPassword) => {
    return await axiosService().post(`auth/forgot-password/`, payload); 
  },
  verifyEmail: async (email: string | undefined, payload: verifyEmail ) => {
    return await axiosService().post(`patient/verify/${email}`, payload); 
  },
  createHealth: async (payload: CreateHealth) => {
    return await axiosService().post(`patient/health/create`, payload); 
  },
  createAppointment: async (payload: CreateAppointmet) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.CREATE_APPOINTMENT, payload); 
  },
  createBloodPressure: async (payload: BloodPressure) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.CREATE_BLOOD_PRESSURE, payload); 
  },
  getAppointments: async () => {
    const response = await axiosService().get(PATIENTS_ENDPOINTS.GET_APPOINTMENTS)
    return await response.data; 
  },
  getAppointmentDetails: async (appointment_id: number) => {
    const response = await axiosService().get(`patient/appointments/${appointment_id}`)
    return await response.data; 
  },
  getUser: async () => {
    const response = await axiosService().get(PATIENTS_ENDPOINTS.USER)
    return await response.data
  }
}
