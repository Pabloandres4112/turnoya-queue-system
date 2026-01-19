import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  // TODO: Integrar con base de datos

  async getUser(id: string) {
    return {
      id,
      businessName: '',
      whatsappNumber: '',
      settings: {}
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    return {
      success: true,
      message: 'Usuario creado',
      userId: 'new-id'
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return {
      success: true,
      message: 'Usuario actualizado'
    };
  }

  async getUserSettings(id: string) {
    return {
      averageServiceTime: 30,
      automationEnabled: true,
      excludedContacts: [],
      maxDaysAhead: 7
    };
  }
}
