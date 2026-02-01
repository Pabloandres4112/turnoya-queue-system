import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Get(':id/settings')
  @UseGuards(JwtAuthGuard)
  async getUserSettings(@Param('id') id: string) {
    return this.userService.getUserSettings(id);
  }
}
