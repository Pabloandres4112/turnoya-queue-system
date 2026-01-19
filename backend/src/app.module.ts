import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import type {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {QueueController} from './modules/queue/queue.controller';
import {QueueService} from './modules/queue/queue.service';
import {UserController} from './modules/users/user.controller';
import {UserService} from './modules/users/user.service';
import {NotificationController} from './modules/notifications/notif.controller';
import {NotificationService} from './modules/notifications/notif.service';
import {WhatsAppService} from './services/whatsapp.service';
import {NotificationCoreService} from './services/notification.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME') || 'turnoya',
        password: configService.get<string>('DB_PASSWORD') || 'turnoya',
        database: configService.get<string>('DB_NAME') || 'turnoya_db',
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        logging: configService.get<string>('NODE_ENV') === 'development',
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
