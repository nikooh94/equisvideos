import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as movieRepository_1 from '../domain/movie.repository';

@Injectable()
export class DeleteMovieUseCase {
    constructor(
        @Inject(movieRepository_1.MOVIE_REPOSITORY)
        private readonly movieRepository: movieRepository_1.IMovieRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const movie = await this.movieRepository.findById(id);

        if (!movie) {
            throw new NotFoundException(`No se encontró la película con ID: ${id}`);
        }

        await this.movieRepository.delete(id);
    }
}