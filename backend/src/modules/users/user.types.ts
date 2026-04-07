export interface User {
  id: string;
  businessName: string;
  whatsappNumber: string;
  settings: Record<string, any>;
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  userId: string;
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
}

export interface UserSettings {
  averageServiceTime: number;
  automationEnabled: boolean;
  excludedContacts: string[];
  maxDaysAhead: number;
}
