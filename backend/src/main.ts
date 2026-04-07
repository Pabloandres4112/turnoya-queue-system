import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'http://192.168.100.6'],
    credentials: true,
  });

  // Pipes globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Filtros globales
  app.useGlobalFilters(new HttpExceptionFilter());

  // Interceptores globales
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Prefijo global de API
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 TurnoYa Backend corriendo en http://localhost:${port}`);
  console.log(`📚 API disponible en http://localhost:${port}/api/v1`);
}

bootstrap();
