import { Injectable } from '@nestjs/common';
import { CreateQueueDto, UpdateQueueDto } from './queue.dto';

@Injectable()
export class QueueService {
  // TODO: Integrar con base de datos

  async getQueue() {
    // Retorna la cola actual del día
    return {
      queue: [],
      total: 0,
      currentPosition: 0
    };
  }

  async addToQueue(createQueueDto: CreateQueueDto) {
    // Agrega un cliente a la cola
    return {
      success: true,
      message: 'Cliente agregado a la cola'
    };
  }

  async updateQueueItem(id: string, updateQueueDto: UpdateQueueDto) {
    // Actualiza un turno en la cola
    return {
      success: true,
      message: 'Turno actualizado'
    };
  }

  async removeFromQueue(id: string) {
    // Elimina un turno de la cola
    return {
      success: true,
      message: 'Turno eliminado'
    };
  }

  async nextInQueue() {
    // Avanza al siguiente en la cola
    return {
      success: true,
      message: 'Siguiente turno'
    };
  }

  async completeQueueItem(id: string) {
    // Marca un turno como completado
    return {
      success: true,
      message: 'Turno completado'
    };
  }
}
