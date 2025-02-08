import { AxiosInstance } from 'axios';

// ----------------------------------------------------------------

export const setRequestHeaderToken = (axiosInstance: AxiosInstance, token: string) => {
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

// ----------------------------------------------------------------

export const removeRequestHeaderToken = (axiosInstance: AxiosInstance) => {
  delete axiosInstance.defaults.headers['Authorization'];
};
