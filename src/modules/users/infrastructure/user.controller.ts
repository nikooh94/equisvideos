import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegisterUserUseCase } from '../application/register-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';
@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly registerUseCase: RegisterUserUseCase) { }

    @Post('signup')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.registerUseCase.execute(
            createUserDto.email,
            createUserDto.password,
            createUserDto.role
        );
    }
}