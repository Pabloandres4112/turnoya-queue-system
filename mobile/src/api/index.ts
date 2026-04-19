import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, STORAGE_KEYS } from '../constants';
import {
  AuthResponse,
  LoginDto,
  RegisterDto,
  QueueResponse,
  QueueItem,
  CreateQueueDto,
  UpdateQueueDto,
  AuthUser,
  UserSettings,
  UpdateUserDto,
} from '../types';

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

  addToQueue: async (dto: CreateQueueDto): Promise<QueueItem> => {
    const { data } = await apiClient.post<QueueItem>('/queue', dto);
    return data;
  },

  updateQueueItem: async (id: string, dto: UpdateQueueDto): Promise<QueueItem> => {
    const { data } = await apiClient.put<QueueItem>(`/queue/${id}`, dto);
    return data;
  },

  removeFromQueue: async (id: string): Promise<void> => {
    await apiClient.delete(`/queue/${id}`);
  },

  nextInQueue: async (): Promise<QueueItem> => {
    const { data } = await apiClient.post<QueueItem>('/queue/next');
    return data;
  },

  completeQueueItem: async (id: string): Promise<QueueItem> => {
    const { data } = await apiClient.post<QueueItem>(`/queue/complete/${id}`);
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
