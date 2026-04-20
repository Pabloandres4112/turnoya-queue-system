/**
 * TypeScript Types y Interfaces
 */

// ─── Queue ───────────────────────────────────────────────────────────────────

export type QueueStatus = 'waiting' | 'in-progress' | 'completed' | 'noShow';

export interface QueueItem {
  id: string;
  clientName: string;
  phoneNumber: string;
  position: number;
  status: QueueStatus;
  estimatedTimeMinutes: number;
  priority: boolean;
  createdAt: string;
  queueDate: string;
}

export interface QueueResponse {
  queue: QueueItem[];
  total: number;
  currentPosition: number;
  message?: string;
}

export interface CreateQueueDto {
  clientName: string;
  phoneNumber: string;
  estimatedTimeMinutes?: number;
  priority?: boolean;
}

export interface UpdateQueueDto {
  status?: QueueStatus;
  estimatedTimeMinutes?: number;
  position?: number;
}

// ─── Auth / Users ─────────────────────────────────────────────────────────────

export interface UserSettings {
  averageServiceTime: number;
  automationEnabled: boolean;
  excludedContacts: string[];
  maxDaysAhead: number;
}

export interface AuthUser {
  id: string;
  role: string;
  businessName: string;
  whatsappNumber: string;
  email: string | null;
  settings: UserSettings | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  identifier: string;
  password: string;
}

export interface RegisterDto {
  businessName: string;
  whatsappNumber: string;
  email?: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export interface UpdateUserDto {
  businessName?: string;
  email?: string;
  settings?: Partial<UserSettings>;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Queue: undefined;
  AddClient: undefined;
  Settings: undefined;
  ClientDetail: { item: QueueItem };
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;
