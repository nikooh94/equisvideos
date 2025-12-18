import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Star Wars API - Movie Management')
    .setDescription('API para gestionar películas y usuarios (Star Wars Challenge)')
    .setVersion('1.0')
    .addBearerAuth() // Esto es para que Swagger permita poner el token JWT
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // La documentación estará en /api

  await app.listen(3000);
}
bootstrap();