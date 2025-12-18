import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// Importamos específicamente lo que necesitamos para evitar confusiones
import * as userRepository_1 from '../../users/domain/user.repository';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(userRepository_1.USER_REPOSITORY)
        private readonly userRepository: userRepository_1.IUserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async execute(email: string, pass: string) {
        const user = await this.userRepository.findByEmail(email);

        // Si el usuario no existe o NO tiene password (por seguridad o error de DB)
        if (!user || !user.password) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        // Ahora TypeScript sabe que user.password existe y es un string
        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                email: user.email,
                role: user.role,
            },
        };
    }
}