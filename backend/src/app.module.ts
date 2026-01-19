import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueueController } from './modules/queue/queue.controller';
import { QueueService } from './modules/queue/queue.service';
import { UserController } from './modules/users/user.controller';
import { UserService } from './modules/users/user.service';
import { NotificationController } from './modules/notifications/notif.controller';
import { NotificationService } from './modules/notifications/notif.service';
import { WhatsAppService } from './services/whatsapp.service';
import { NotificationCoreService } from './services/notification.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    QueueController,
    UserController,
    NotificationController,
  ],
  providers: [
    QueueService,
    UserService,
    NotificationService,
    WhatsAppService,
    NotificationCoreService,
  ],
})
export class AppModule {}
