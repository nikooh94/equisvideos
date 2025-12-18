import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SyncMoviesUseCase } from '../application/sync-movies.use-case';
import * as movieRepository_1 from '../domain/movie.repository';
import { Inject } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/infrastructure/guards/roles.guard';
import { Roles } from '../../auth/infrastructure/decorators/roles.decorator';
import { UserRole } from '../../users/domain/user-role.enum';

@ApiTags('Movies')
@ApiBearerAuth() // Indica a Swagger que este controlador requiere Token
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('movies')
export class MovieController {
    constructor(
        private readonly syncMoviesUseCase: SyncMoviesUseCase,
        @Inject(movieRepository_1.MOVIE_REPOSITORY) private readonly movieRepository: movieRepository_1.IMovieRepository,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las películas' })
    findAll() {
        return this.movieRepository.findAll();
    }

    @Post('sync')
    @Roles(UserRole.ADMIN) // SOLO ADMIN
    @ApiOperation({ summary: 'Sincronizar con Star Wars API (Solo Admin)' })
    sync() {
        return this.syncMoviesUseCase.execute();
    }

    @Get(':id')
    @Roles(UserRole.REGULAR, UserRole.ADMIN) // Usuarios Regulares y Admin
    @ApiOperation({ summary: 'Obtener detalle de una película' })
    findOne(@Param('id') id: string) {
        return this.movieRepository.findById(id);
    }

    // Agrega aquí los métodos para Create, Update y Delete siguiendo la misma lógica de Roles(UserRole.ADMIN)
}