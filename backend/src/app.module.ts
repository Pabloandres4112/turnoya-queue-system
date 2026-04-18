import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { QueueController } from './modules/queue/queue.controller';
import { QueueService } from './modules/queue/queue.service';
import { UserController } from './modules/users/user.controller';
import { UserService } from './modules/users/user.service';
import { NotificationController } from './modules/notifications/notif.controller';
import { NotificationService } from './modules/notifications/notif.service';
import { WhatsAppService } from './services/whatsapp.service';
import { NotificationCoreService } from './services/notification.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './modules/users/user.entity';
import { QueueEntity } from './modules/queue/queue.entity';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME') || 'turnoya',
        password: configService.get<string>('DB_PASSWORD') || 'turnoya',
        database: configService.get<string>('DB_NAME') || 'turnoya_db',
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],
        synchronize:
          configService.get<string>('DB_SYNC') === 'true' ||
          configService.get<string>('NODE_ENV') === 'development',
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    TypeOrmModule.forFeature([UserEntity, QueueEntity]),
  ],
  controllers: [QueueController, UserController, NotificationController],
  providers: [
    QueueService,
    UserService,
    NotificationService,
    WhatsAppService,
    NotificationCoreService,
    RolesGuard,
  ],
})
export class AppModule {}
