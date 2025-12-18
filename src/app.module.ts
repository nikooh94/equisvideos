import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ¡Ojo! Solo para desarrollo, crea las tablas automáticamente
    }),
    // Aquí iremos agregando nuestros módulos de Users, Auth y Movies
  ],
})
export class AppModule { }