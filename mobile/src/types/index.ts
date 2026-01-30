/**
 * TypeScript Types y Interfaces
 */

export interface QueueItem {
  id: string;
  clientName: string;
  phoneNumber: string;
  position: number;
  status: 'waiting' | 'in-progress' | 'completed' | 'noShow';
  estimatedTime: number;
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
  estimatedTime?: number;
  priority?: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  Queue: undefined;
  AddClient: undefined;
  Settings: undefined;
};
