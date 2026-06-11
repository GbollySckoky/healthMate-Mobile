import { login } from "@/types/login";
import axiosService from "../lib/axios"
import { forgotPassword } from "@/types/forgotPassword";
import { verifyEmail } from "@/types/verifyEmail";
import { PATIENTS_ENDPOINTS } from "@/lib/endpoints";
import { Signup } from "@/lib/interface/signup-interface";
import { CreateHealth } from "@/lib/interface/create-health-interface";
import { BloodPressure } from "@/lib/interface/blood-pressure";
import { Medication } from "@/lib/interface/medication";
import { Weight } from "@/lib/interface/weight";
import { Sleep } from "@/lib/interface/sleep";
import { Mood } from "@/lib/interface/mood";
import { Appointment } from "@/lib/interface/createAppointment";

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
  },
  createBloodPressue: async (payload: BloodPressure) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.BLOOD_PRESSURE, payload)
  },
  getBloodPressure: async () => {
    const response = await axiosService().get(PATIENTS_ENDPOINTS.BLOOD_PRESSURE)
    return await response.data
  },
  createMedication: async (payload: Medication) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.MEDICATION, payload)
  },
  getMedication: async () => {
    const response = await axiosService().get(PATIENTS_ENDPOINTS.MEDICATION)
    return await response.data
  },
  createWeight: async (payload: Weight) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.WEIGHT, payload)
  },
  getWeight: async () => {
    const response = await axiosService().get(PATIENTS_ENDPOINTS.WEIGHT)
    return await response.data
  },
  createMood: async (payload: Mood) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.MOOD, payload)
  },
  getMood: async () => {
    const response = await axiosService().get(PATIENTS_ENDPOINTS.MOOD)
    return await response.data
  },
  createSleep: async (payload: Sleep) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.SLEEP, payload)
  },
  getSleep: async () => {
    const response = await axiosService().get(PATIENTS_ENDPOINTS.SLEEP)
    return await response.data
  },
  createConsultation: async(payload: Appointment) => {
    return await axiosService().post(PATIENTS_ENDPOINTS.BOOK_APPOINTMENT, payload)
  }
}
