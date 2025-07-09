import axios, { type AxiosError } from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_BASE_URI;
if (!apiUrl) {
  console.warn('api base url is not provided in env file');
  // alert('api base url is not provided in env file')
  // window.location.href = "/maintenance";
}

const axiosBase = axios.create({
  baseURL: apiUrl,
});
// Add request interceptor to handle caching
axiosBase.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Add response interceptor to save cache
axiosBase.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const originalRequest = error.config;
    if (typeof (error.response?.data as any)?.message === 'object') {
      return Promise.reject((error.response?.data as any)?.message.join(', '));
    }

    // @ts-expect-error _retry is not define in originalRequest type
    if (error.response?.status == 401 && !originalRequest?._retry) {
      // localStorage.clear();
      // window.location.href = "/";
    }

    if (error?.code === 'ERR_NETWORK' || error?.status === 502) {
      // window.location.href = "/maintenance";
    }
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      error.message = 'No internet connection';
      toast.error('No internet connection');
    }
    return Promise.reject(error.response);
  },
);

export { axiosBase };
