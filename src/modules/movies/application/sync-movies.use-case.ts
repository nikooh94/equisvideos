import { Injectable, Inject, Logger } from '@nestjs/common';
import * as movieRepository_1 from '../domain/movie.repository';
import * as starWarsApiPort from '../domain/star-wars-api.port';

@Injectable()
export class SyncMoviesUseCase {
    private readonly logger = new Logger(SyncMoviesUseCase.name);

    constructor(
        @Inject(starWarsApiPort.STAR_WARS_API_PORT)
        private readonly starWarsApi: starWarsApiPort.IStarWarsApiPort,
        @Inject(movieRepository_1.MOVIE_REPOSITORY)
        private readonly movieRepository: movieRepository_1.IMovieRepository,
    ) { }

    async execute() {
        try {
            this.logger.log('Iniciando sincronización con Star Wars API...');

            // 1. Obtenemos las películas de la API externa
            const externalMovies = await this.starWarsApi.getMovies();

            if (!externalMovies || externalMovies.length === 0) {
                return { message: 'No se encontraron películas para sincronizar.' };
            }

            // 2. Guardamos o actualizamos cada película en nuestra base de datos local
            const syncPromises = externalMovies.map(movieData =>
                this.movieRepository.save(movieData)
            );

            await Promise.all(syncPromises);

            this.logger.log(`Sincronización exitosa: ${externalMovies.length} películas procesadas.`);

            return {
                success: true,
                message: `${externalMovies.length} películas sincronizadas con éxito.`,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            this.logger.error('Error durante la sincronización:', error.message);
            throw error;
        }
    }
}