import { Injectable } from '@nestjs/common';
import { SendNotificationDto } from './notif.dto';

@Injectable()
export class NotificationService {
  async sendNotification(sendNotificationDto: SendNotificationDto) {
    // TODO: Integrar con servicio de notificaciones push
    return {
      success: true,
      message: 'Notificación enviada'
    };
  }

  async notifyQueueUpdate(data: any) {
    // Notifica cambios en la cola a la app móvil
    return {
      success: true,
      message: 'Actualización de cola enviada'
    };
  }
}
