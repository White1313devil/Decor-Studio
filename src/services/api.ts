import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type { ApiResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.interiorwithsai.com/v1';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Generic GET
export const get = async <T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> => {
  const res = await apiClient.get<ApiResponse<T>>(url, { params });
  return res.data;
};

// Generic POST
export const post = async <T>(url: string, data?: unknown): Promise<ApiResponse<T>> => {
  const res = await apiClient.post<ApiResponse<T>>(url, data);
  return res.data;
};

// Generic PUT
export const put = async <T>(url: string, data?: unknown): Promise<ApiResponse<T>> => {
  const res = await apiClient.put<ApiResponse<T>>(url, data);
  return res.data;
};

// Generic DELETE
export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  const res = await apiClient.delete<ApiResponse<T>>(url);
  return res.data;
};

// Specific API endpoints
export const categoriesApi = {
  getAll: () => get('/categories'),
  getById: (id: number) => get(`/categories/${id}`),
};

export const servicesApi = {
  getAll: () => get('/services'),
  getById: (id: number) => get(`/services/${id}`),
};

export const galleryApi = {
  getAll: (params?: { category?: string; page?: number; limit?: number }) =>
    get('/gallery', params as Record<string, unknown>),
  getById: (id: number) => get(`/gallery/${id}`),
};

export const contactApi = {
  submit: (data: { name: string; email: string; phone?: string; service?: string; message: string }) =>
    post('/contact', data),
};

export default apiClient;
