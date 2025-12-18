import { Injectable, Inject, ConflictException } from '@nestjs/common';
import * as movieRepository_1 from '../domain/movie.repository';
import { Movie } from '../domain/movie.entity';

@Injectable()
export class CreateMovieUseCase {
    constructor(
        @Inject(movieRepository_1.MOVIE_REPOSITORY)
        private readonly movieRepository: movieRepository_1.IMovieRepository,
    ) { }

    async execute(movieData: Partial<Movie>): Promise<Movie> {
        // Validamos que no exista una película con el mismo título para evitar duplicados manuales
        if (movieData.title) {
            const title = movieData.title;
            const existing = await this.movieRepository.findAll();
            const duplicate = existing.find(m => m.title.toLowerCase() === title.toLowerCase());

            if (duplicate) {
                throw new ConflictException(`La película "${title}" ya existe en la base de datos`);
            }
        }

        return await this.movieRepository.save(movieData);
    }
}