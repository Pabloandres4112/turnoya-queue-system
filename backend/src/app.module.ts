import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {QueueController} from './modules/queue/queue.controller';
import {QueueService} from './modules/queue/queue.service';
import {UserController} from './modules/users/user.controller';
import {UserService} from './modules/users/user.service';
import {NotificationController} from './modules/notifications/notif.controller';
import {NotificationService} from './modules/notifications/notif.service';
import {WhatsAppService} from './services/whatsapp.service';
import {NotificationCoreService} from './services/notification.service';
import {config} from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: ['src/**/*.entity.ts'],
        migrations: ['src/migrations/*.ts'],
        synchronize: configService.get('app.environment') === 'development',
        logging: configService.get('app.environment') === 'development',
      }),
    }),
  ],
  controllers: [QueueController, UserController, NotificationController],
  providers: [
    QueueService,
    UserService,
    NotificationService,
    WhatsAppService,
    NotificationCoreService,
  ],
})
export class AppModule {}
