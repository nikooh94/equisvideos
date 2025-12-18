import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { User } from '../domain/user.entity';
import * as userRepository_1 from '../domain/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserUseCase {
    constructor(
        @Inject(userRepository_1.USER_REPOSITORY) // Inyectamos usando el Token del Puerto
        private readonly userRepository: userRepository_1.IUserRepository,
    ) { }

    async execute(email: string, password: string, role: any): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new BadRequestException('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userRepository.save({
            email,
            password: hashedPassword,
            role,
        });

        // Por seguridad, quitamos la password del objeto de respuesta
        delete user.password;
        return user;
    }
}