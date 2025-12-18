import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../domain/user-role.enum';

export class CreateUserDto {
    @ApiProperty({ example: 'nicolas@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ enum: UserRole, default: UserRole.REGULAR })
    @IsEnum(UserRole)
    role: UserRole;
}