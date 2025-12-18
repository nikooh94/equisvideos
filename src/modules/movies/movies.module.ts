import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './domain/movie.entity';
import { MovieController } from './infrastructure/movie.controller';
import { SyncMoviesUseCase } from './application/sync-movies.use-case';
import { CreateMovieUseCase } from './application/create-movie.use-case';
import { DeleteMovieUseCase } from './application/delete-movie.use-case';
import { MOVIE_REPOSITORY } from './domain/movie.repository';
import { TypeOrmMovieRepository } from './infrastructure/persistence/typeorm-movie.repository';
import { STAR_WARS_API_PORT } from './domain/star-wars-api.port';
import { SwapiAdapter } from './infrastructure/external/swapi.adapter';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Movie])
    ],
    controllers: [MovieController],
    providers: [
        SyncMoviesUseCase,
        CreateMovieUseCase,
        DeleteMovieUseCase,
        {
            provide: MOVIE_REPOSITORY,
            useClass: TypeOrmMovieRepository,
        },
        {
            provide: STAR_WARS_API_PORT,
            useClass: SwapiAdapter,
        }
    ],
    exports: [SyncMoviesUseCase, CreateMovieUseCase, DeleteMovieUseCase]
})
export class MoviesModule { }