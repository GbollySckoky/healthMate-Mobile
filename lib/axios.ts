import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import { STATUS } from './status';
import { ROUTES } from './routes';
import { storageService } from './storage';
// import { navigate } from './navigationRef';

const axiosService = () => {
  const instance = axios.create({
    baseURL: 'https://healthteamapi.onrender.com/api/',
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
        
        if (status === STATUS.UN_AUTHORIZED || !storageService.isAuthenticated()) {
          // SecureStore.deleteItemAsync('my_access_token');
          storageService.clearAuthData()
          // navigate(ROUTES.login);
          // windowlocation.href = ROUTES.login
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export default axiosService