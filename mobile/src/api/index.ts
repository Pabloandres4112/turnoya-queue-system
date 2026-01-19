import api from './client';

export const queueAPI = {
  getQueue: () => api.get('/queue'),
  addToQueue: (data: any) => api.post('/queue', data),
  updateQueue: (id: string, data: any) => api.put(`/queue/${id}`, data),
  deleteQueue: (id: string) => api.delete(`/queue/${id}`),
  nextInQueue: () => api.post('/queue/next'),
  completeQueueItem: (id: string) => api.post(`/queue/complete/${id}`),
};

export const userAPI = {
  getUser: (id: string) => api.get(`/users/${id}`),
  createUser: (data: any) => api.post('/users', data),
  updateUser: (id: string, data: any) => api.put(`/users/${id}`, data),
  getUserSettings: (id: string) => api.get(`/users/${id}/settings`),
};

export const notificationAPI = {
  sendNotification: (data: any) => api.post('/notifications/send', data),
};

export default {
  queue: queueAPI,
  user: userAPI,
  notification: notificationAPI,
};
