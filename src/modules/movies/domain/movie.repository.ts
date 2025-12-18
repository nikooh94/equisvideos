import { Movie } from './movie.entity';

export interface IMovieRepository {
    findAll(): Promise<Movie[]>;
    findById(id: string): Promise<Movie | null>;
    save(movie: Partial<Movie>): Promise<Movie>;
    update(id: string, movie: Partial<Movie>): Promise<Movie>;
    delete(id: string): Promise<void>;
}

export const MOVIE_REPOSITORY = 'MOVIE_REPOSITORY';