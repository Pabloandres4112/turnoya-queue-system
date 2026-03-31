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

  async createUser(_createUserDto: CreateUserDto) {
    return {
      success: true,
      message: 'Usuario creado',
      userId: 'new-id'
    };
  }

  async updateUser(_id: string, _updateUserDto: UpdateUserDto) {
    return {
      success: true,
      message: 'Usuario actualizado'
    };
  }

  async getUserSettings(_id: string) {
    return {
      averageServiceTime: 30,
      automationEnabled: true,
      excludedContacts: [],
      maxDaysAhead: 7
    };
  }
}
