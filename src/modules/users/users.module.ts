import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserController } from './infrastructure/user.controller';
import { RegisterUserUseCase } from './application/register-user.use-case';
import { TypeOrmUserRepository } from './infrastructure/persistence/typeorm-user.repository';
import { USER_REPOSITORY } from './domain/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        RegisterUserUseCase,
        {
            provide: USER_REPOSITORY, // El token
            useClass: TypeOrmUserRepository, // La implementación real
        },
    ],
    exports: [RegisterUserUseCase, USER_REPOSITORY], // Exportamos para el módulo de Auth
})
export class UsersModule { }