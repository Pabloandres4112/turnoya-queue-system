export interface QueueItem {
  id: string;
  clientName: string;
  phoneNumber: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'no-show';
  position: number;
  estimatedTime: number;
  priority?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  businessName: string;
  whatsappNumber: string;
  email?: string;
  settings?: UserSettings;
}

export interface UserSettings {
  averageServiceTime: number;
  automationEnabled: boolean;
  excludedContacts: string[];
  maxDaysAhead: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
