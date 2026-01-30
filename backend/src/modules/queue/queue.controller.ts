import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto, UpdateQueueDto } from './queue.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  // 📌 GET: Obtener cola actual CON DATOS FALSOS
  @Get()
  async getQueue(): Promise<any> {
    return this.queueService.getQueue();
  }

  // 📌 GET especial: Datos MOCK puros (sin lógica)
  @Get('mock')
  async getQueueMock(): Promise<any> {
    return this.queueService.getQueueMock();
  }

  // 📌 POST: Agregar cliente a la cola
  @Post()
  async addToQueue(@Body() createQueueDto: CreateQueueDto): Promise<any> {
    console.log('📥 POST /queue - Datos recibidos:', createQueueDto);
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
