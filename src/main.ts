import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Prefijo global: Todas las rutas empezarán con /api
  app.setGlobalPrefix('api');

  // 2. Validación automática de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 3. Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Star Wars - Movie Management API')
    .setDescription('Prueba técnica: Arquitectura Hexagonal con NestJS')
    .setVersion('1.0')
    .addBearerAuth() // Habilita el candadito para JWT en Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger estará disponible en http://localhost:3000/api/docs
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/api/docs`);
}
bootstrap();