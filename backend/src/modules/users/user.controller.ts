import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User, CreateUserResponse, UpdateUserResponse, UserSettings } from './user.types';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/settings')
  @UseGuards(JwtAuthGuard)
  async getUserSettings(@Param('id') id: string): Promise<UserSettings> {
    return this.userService.getUserSettings(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserResponse> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
