import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationCoreService {
  /**
   * Servicio para notificaciones push a la app móvil
   */

  async sendPushNotification(userId: string, title: string, body: string, data?: any) {
    // TODO: Implementar integración con servicio de push notifications
    console.log(`Enviando notificación push a usuario ${userId}`);
    return {
      success: true,
      notificationId: 'notif-id'
    };
  }
}
