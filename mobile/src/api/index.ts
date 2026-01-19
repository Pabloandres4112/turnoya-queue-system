import api from './client';
import type {QueueItem, User, UserSettings} from '../types';
import type {AxiosResponse} from 'axios';

interface QueueResponse {
  data: QueueItem[];
  total: number;
}

interface UserResponse {
  data: User;
}

interface NotificationPayload {
  userId: string;
  message: string;
  type: 'queue_update' | 'turn_ready' | 'custom';
}

export const queueAPI = {
  getQueue: (): Promise<AxiosResponse<QueueResponse>> => api.get('/queue'),
  addToQueue: (data: Partial<QueueItem>): Promise<AxiosResponse<QueueItem>> => 
    api.post('/queue', data),
  updateQueue: (id: string, data: Partial<QueueItem>): Promise<AxiosResponse<QueueItem>> => 
    api.put(`/queue/${id}`, data),
  deleteQueue: (id: string): Promise<AxiosResponse<void>> => 
    api.delete(`/queue/${id}`),
  nextInQueue: (): Promise<AxiosResponse<QueueItem>> => 
    api.post('/queue/next'),
  completeQueueItem: (id: string): Promise<AxiosResponse<QueueItem>> => 
    api.post(`/queue/complete/${id}`),
};

export const userAPI = {
  getUser: (id: string): Promise<AxiosResponse<UserResponse>> => 
    api.get(`/users/${id}`),
  createUser: (data: Partial<User>): Promise<AxiosResponse<User>> => 
    api.post('/users', data),
  updateUser: (id: string, data: Partial<User>): Promise<AxiosResponse<User>> => 
    api.put(`/users/${id}`, data),
  getUserSettings: (id: string): Promise<AxiosResponse<UserSettings>> => 
    api.get(`/users/${id}/settings`),
};

export const notificationAPI = {
  sendNotification: (data: NotificationPayload): Promise<AxiosResponse<{success: boolean}>> => 
    api.post('/notifications/send', data),
};

export default {
  queue: queueAPI,
  user: userAPI,
  notification: notificationAPI,
};
