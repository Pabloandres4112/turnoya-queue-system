import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, STORAGE_KEYS } from '../constants';
import {
  AuthResponse,
  LoginDto,
  RegisterDto,
  QueueResponse,
  CreateQueueDto,
  QueueMutationResponse,
  UpdateQueueDto,
  AuthUser,
  UserSettings,
  UpdateUserDto,
} from '../types';

interface ApiErrorPayload {
  message?: string | string[];
  error?: string;
  details?: Array<{ field?: string; message?: string; errors?: string[] }>;
}

export const getApiErrorMessage = (
  error: unknown,
  fallback = 'Ocurrió un error inesperado',
): string => {
  if (!axios.isAxiosError(error)) {
    return fallback;
  }

  const payload = error.response?.data as ApiErrorPayload | undefined;

  if (Array.isArray(payload?.details) && payload.details.length > 0) {
    const firstDetail = payload.details[0];

    if (Array.isArray(firstDetail?.errors) && firstDetail.errors.length > 0) {
      return firstDetail.errors[0];
    }

    if (typeof firstDetail?.message === 'string' && firstDetail.message.trim().length > 0) {
      return firstDetail.message;
    }
  }

  if (Array.isArray(payload?.message) && payload.message.length > 0) {
    return payload.message[0];
  }

  if (typeof payload?.message === 'string' && payload.message.trim().length > 0) {
    return payload.message;
  }

  if (typeof payload?.error === 'string' && payload.error.trim().length > 0) {
    return payload.error;
  }

  return fallback;
};

// ─── Axios Instance ───────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
    return Promise.reject(error);
  },
);

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authApi = {
  login: async (dto: LoginDto): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', dto);
    return data;
  },

  register: async (dto: RegisterDto): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', dto);
    return data;
  },

  getProfile: async (): Promise<AuthUser> => {
    const { data } = await apiClient.get<AuthUser>('/auth/me');
    return data;
  },
};

// ─── Queue API ────────────────────────────────────────────────────────────────

export const queueApi = {
  getQueue: async (): Promise<QueueResponse> => {
    const { data } = await apiClient.get<QueueResponse>('/queue');
    return data;
  },

  addToQueue: async (dto: CreateQueueDto): Promise<QueueMutationResponse> => {
    const { data } = await apiClient.post<QueueMutationResponse>('/queue', dto);
    return data;
  },

  updateQueueItem: async (id: string, dto: UpdateQueueDto): Promise<QueueMutationResponse> => {
    const { data } = await apiClient.put<QueueMutationResponse>(`/queue/${id}`, dto);
    return data;
  },

  removeFromQueue: async (id: string): Promise<void> => {
    await apiClient.delete(`/queue/${id}`);
  },

  nextInQueue: async (): Promise<QueueMutationResponse> => {
    const { data } = await apiClient.post<QueueMutationResponse>('/queue/next');
    return data;
  },

  completeQueueItem: async (id: string): Promise<QueueMutationResponse> => {
    const { data } = await apiClient.post<QueueMutationResponse>(`/queue/complete/${id}`);
    return data;
  },
};

// ─── Users API ────────────────────────────────────────────────────────────────

export const usersApi = {
  getUser: async (id: string): Promise<AuthUser> => {
    const { data } = await apiClient.get<AuthUser>(`/users/${id}`);
    return data;
  },

  getUserSettings: async (id: string): Promise<UserSettings> => {
    const { data } = await apiClient.get<UserSettings>(`/users/${id}/settings`);
    return data;
  },

  updateUser: async (id: string, dto: UpdateUserDto): Promise<AuthUser> => {
    const { data } = await apiClient.put<AuthUser>(`/users/${id}`, dto);
    return data;
  },
};

export default apiClient;
