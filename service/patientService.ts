import { login } from "@/types/login";
import axiosService from "../lib/axios"

export const patientService = {
    login: async (payload: login) => {
        return await axiosService().post(`auth/login/`, payload); 
        // this returns the data because interceptor returns response.data
    },
}
