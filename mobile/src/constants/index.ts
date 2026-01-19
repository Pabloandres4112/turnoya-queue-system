export const APP_NAME = 'TurnoYa';
export const APP_VERSION = '1.0.0';

export const API_BASE_URL = 'http://localhost:3000/api/v1';
export const API_TIMEOUT = 10000;

export const COLORS = {
  primary: '#007AFF',
  secondary: '#E5E5EA',
  danger: '#FF3B30',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#2196F3',
  background: '#F2F2F7',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8E8E93',
  lightGray: '#D1D1D6',
};

export const QUEUE_STATUS = {
  WAITING: 'waiting',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  NO_SHOW: 'no-show',
} as const;

export const DEFAULT_SETTINGS = {
  averageServiceTime: 30,
  automationEnabled: true,
  excludedContacts: [],
  maxDaysAhead: 7,
};

export const MESSAGES = {
  QUEUE_LOADED: 'Cola cargada correctamente',
  QUEUE_EMPTY: 'No hay turnos en la cola',
  ADDED_SUCCESSFULLY: 'Agregado correctamente',
  UPDATED_SUCCESSFULLY: 'Actualizado correctamente',
  DELETED_SUCCESSFULLY: 'Eliminado correctamente',
  ERROR: 'Error al realizar la operación',
};
