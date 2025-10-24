import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import { STATUS } from './status';
// import { ROUTES } from './routes';
import { storageService } from './storage';

// async function getToken(key: string) {
//   let result = await SecureStore.getItemAsync(key);
//   return result;
// }

const axiosService = () => {
  const instance = axios.create({
    baseURL: 'https://api.healthmate.dyung.me/',
    headers: {
      "Content-Type": 'application/json'
    }
  })

  instance.interceptors.request.use(
    async (config) => {
      const token = await storageService.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // console.log('API Response:', response); // Debug log
      // Don't return response.data here if you want access to full response
      return response;
    },
    (error) => {
      if (error.response) {
        const status = error.response.status;
        
        if (status === STATUS.UN_AUTHORIZED) {
          // SecureStore.deleteItemAsync('my_access_token');
          storageService.clearAuthData()
          // window.location.href = ROUTES.login
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export default axiosService