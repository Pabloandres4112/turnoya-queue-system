export const API_URL = 'http://10.0.2.2:3000/api/v1'; // Android Emulator


export const COLORS = {
  primary: '#2563eb',
  secondary: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  gray: '#64748b',
  lightGray: '#f5f5f5',
  white: '#ffffff',
  black: '#1e293b',
};

export const QUEUE_STATUS = {
  WAITING: 'waiting',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  NO_SHOW: 'noShow',
} as const;

export const DEFAULT_ESTIMATED_TIME = 30; // minutos
