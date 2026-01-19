export class CreateUserDto {
  businessName: string;
  whatsappNumber: string;
  email?: string;
}

export class UpdateUserDto {
  businessName?: string;
  email?: string;
  settings?: UserSettingsDto;
}

export class UserSettingsDto {
  averageServiceTime?: number;
  automationEnabled?: boolean;
  excludedContacts?: string[];
  maxDaysAhead?: number;
}
