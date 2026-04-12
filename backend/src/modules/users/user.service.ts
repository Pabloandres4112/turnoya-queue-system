import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User, CreateUserResponse, UpdateUserResponse, UserSettings } from './user.types';
import { UserEntity } from './user.entity';
import { UserRole } from './user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      order: { createdAt: 'DESC' },
    });

    return users.map((user) => ({
      id: user.id,
      role: user.role,
      businessName: user.businessName,
      whatsappNumber: user.whatsappNumber,
      settings: user.settings ?? null,
    }));
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return {
      id: user.id,
      role: user.role,
      businessName: user.businessName,
      whatsappNumber: user.whatsappNumber,
      settings: user.settings ?? null,
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const user = this.userRepository.create({
      role: UserRole.BUSINESS_OWNER,
      businessName: createUserDto.businessName,
      whatsappNumber: createUserDto.whatsappNumber,
      email: createUserDto.email ?? null,
      settings: {
        averageServiceTime: 30,
        automationEnabled: true,
        excludedContacts: [],
        maxDaysAhead: 7,
      },
    });

    const savedUser = await this.userRepository.save(user);

    return {
      success: true,
      message: 'Usuario creado',
      userId: savedUser.id,
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UpdateUserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    if (updateUserDto.businessName !== undefined) {
      user.businessName = updateUserDto.businessName;
    }

    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.settings !== undefined) {
      user.settings = {
        ...(user.settings ?? {
          averageServiceTime: 30,
          automationEnabled: true,
          excludedContacts: [],
          maxDaysAhead: 7,
        }),
        ...updateUserDto.settings,
      };
    }

    await this.userRepository.save(user);

    return {
      success: true,
      message: 'Usuario actualizado',
    };
  }

  async getUserSettings(id: string): Promise<UserSettings> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return {
      averageServiceTime: user.settings?.averageServiceTime ?? 30,
      automationEnabled: user.settings?.automationEnabled ?? true,
      excludedContacts: user.settings?.excludedContacts ?? [],
      maxDaysAhead: user.settings?.maxDaysAhead ?? 7,
    };
  }
}
