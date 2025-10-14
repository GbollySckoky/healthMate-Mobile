import React from 'react'
import axios from 'axios'


const axiosService = () => {
    const instance = axios.create({
        baseURL:  'https://api.healthmate.dyung.me/',
        headers: {
            "Content-Type": 'application/json'
        }
    })

    instance.interceptors.request.use(
        (config) => {
          // Modify the request configuration or add headers
          config.headers.Authorization = `Bearer `;
          return config;
        },
        (error) => {
          // Handle request errors
          return Promise.reject(error);
        }
      );

      instance.interceptors.response.use(
        (response) => {
          // Modify the response data or handle the response
          return response.data;
        },
        (error) => {
          // Handle response errors
          return Promise.reject(error);
        }
      );
      return instance;
}

export default axiosService