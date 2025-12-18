import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './infrastructure/auth.controller';
import { LoginUseCase } from './application/login.use-case';

@Module({
    imports: [
        UsersModule, // Importante para acceder al USER_REPOSITORY
        PassportModule,
        JwtModule.register({
            global: true,
            secret: 'MI_CLAVE_SECRETA_SUPER_PRO', // En producción usar variables de entorno
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [LoginUseCase],
})
export class AuthModule { }