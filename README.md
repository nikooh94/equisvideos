# Star Wars API - NestJS Hexagonal Architecture

Proyecto desarrollado como prueba técnica. Implementa gestión de películas sincronizadas con SWAPI.

## Tecnologías
- NestJS, TypeORM, SQLite.
- Passport JWT para autenticación.
- Arquitectura Hexagonal (Puertos y Adaptadores).

## Instalación
1. `npm install`
2. Configurar base de datos: Se crea automáticamente como `database.sqlite`.
3. `npm run start:dev`

## Documentación API
Una vez corriendo, acceder a: `http://localhost:3000/api` (Swagger).

## Roles
- **Admin**: Puede sincronizar, crear y eliminar películas.
- **Regular**: Puede ver películas.