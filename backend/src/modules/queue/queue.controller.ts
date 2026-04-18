import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { QueueService } from './queue.service';
import { CreateQueueDto, UpdateQueueDto } from './queue.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserEntity } from '../users/user.entity';

interface AuthRequest extends Request {
  user: UserEntity;
}

@UseGuards(JwtAuthGuard)
@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) { }

  @Get()
  async getQueue(@Req() req: AuthRequest): Promise<any> {
    return this.queueService.getQueue(req.user.id);
  }

  @Post()
  async addToQueue(@Req() req: AuthRequest, @Body() createQueueDto: CreateQueueDto): Promise<any> {
    return this.queueService.addToQueue(req.user.id, createQueueDto);
  }

  @Put(':id')
  async updateQueueItem(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() updateQueueDto: UpdateQueueDto,
  ) {
    return this.queueService.updateQueueItem(req.user.id, id, updateQueueDto);
  }

  @Delete(':id')
  async removeFromQueue(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.queueService.removeFromQueue(req.user.id, id);
  }

  @Post('next')
  async nextInQueue(@Req() req: AuthRequest) {
    return this.queueService.nextInQueue(req.user.id);
  }

  @Post('complete/:id')
  async completeQueueItem(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.queueService.completeQueueItem(req.user.id, id);
  }
}
