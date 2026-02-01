import { Injectable } from '@nestjs/common';
import { CreateQueueDto, UpdateQueueDto, MockQueueItem } from './queue.dto';

@Injectable()
export class QueueService {
  // Datos falsos para demo/testing
  private mockQueue: MockQueueItem[] = [
    {
      id: '1',
      clientName: 'Juan Pérez',
      phoneNumber: '+573001234567',
      position: 1,
      status: 'in-progress',
      estimatedTime: 15,
      priority: false,
      createdAt: new Date(),
      queueDate: new Date(),
    },
    {
      id: '2',
      clientName: 'María García',
      phoneNumber: '+573009876543',
      position: 2,
      status: 'waiting',
      estimatedTime: 30,
      priority: true,
      createdAt: new Date(),
      queueDate: new Date(),
    },
    {
      id: '3',
      clientName: 'Carlos López',
      phoneNumber: '+573005555555',
      position: 3,
      status: 'waiting',
      estimatedTime: 45,
      priority: false,
      createdAt: new Date(),
      queueDate: new Date(),
    },
  ];

  // TODO: Integrar con base de datos

  async getQueue() {
    // Retorna la cola actual del día CON DATOS FALSOS
    return {
      queue: this.mockQueue,
      total: this.mockQueue.length,
      currentPosition: 1,
      message: ' Datos de DEMO - Cola obtenida correctamente'
    };
  }

  async getQueueMock() {
    // Endpoint especial para ver datos falsos sin lógica
    return {
      success: true,
      data: this.mockQueue,
      message: 'Datos MOCK para testing'
    };
  }

  async addToQueue(createQueueDto: CreateQueueDto) {
    // Agrega un cliente a la cola Y lo retorna con ID fake
    const newClient = {
      id: Math.random().toString(36).substring(7),
      clientName: createQueueDto.clientName,
      phoneNumber: createQueueDto.phoneNumber,
      position: this.mockQueue.length + 1,
      status: 'waiting' as const,
      estimatedTime: createQueueDto.estimatedTime ?? 30, // valor por defecto
      priority: createQueueDto.priority ?? false, // valor por defecto
      createdAt: new Date(),
      queueDate: new Date(),
    };
    
    this.mockQueue.push(newClient);
    
    return {
      success: true,
      message: ' Cliente agregado a la cola',
      data: newClient,
      totalInQueue: this.mockQueue.length
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
