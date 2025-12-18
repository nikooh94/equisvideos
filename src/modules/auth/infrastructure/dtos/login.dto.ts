import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'nicolas@example.com',
        description: 'El correo electrónico del usuario'
    })
    @IsEmail({}, { message: 'El formato del correo es inválido' })
    email: string;

    @ApiProperty({
        example: '123456',
        description: 'La contraseña del usuario'
    })
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}