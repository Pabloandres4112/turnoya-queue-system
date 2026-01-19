import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto, UpdateQueueDto } from './queue.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  async getQueue() {
    return this.queueService.getQueue();
  }

  @Post()
  async addToQueue(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.addToQueue(createQueueDto);
  }

  @Put(':id')
  async updateQueueItem(@Param('id') id: string, @Body() updateQueueDto: UpdateQueueDto) {
    return this.queueService.updateQueueItem(id, updateQueueDto);
  }

  @Delete(':id')
  async removeFromQueue(@Param('id') id: string) {
    return this.queueService.removeFromQueue(id);
  }

  @Post('next')
  async nextInQueue() {
    return this.queueService.nextInQueue();
  }

  @Post('complete/:id')
  async completeQueueItem(@Param('id') id: string) {
    return this.queueService.completeQueueItem(id);
  }
}
