import { Test, TestingModule } from '@nestjs/testing';
import { SyncMoviesUseCase } from './sync-movies.use-case';
import { MOVIE_REPOSITORY } from '../domain/movie.repository';
import { STAR_WARS_API_PORT } from '../domain/star-wars-api.port';

describe('SyncMoviesUseCase', () => {
    let useCase: SyncMoviesUseCase;

    // Mocks de los repositorios
    const mockMovieRepository = {
        save: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'uuid', ...dto })),
    };

    const mockStarWarsApi = {
        getMovies: jest.fn().mockResolvedValue([
            { title: 'A New Hope', director: 'George Lucas' },
            { title: 'The Empire Strikes Back', director: 'Irvin Kershner' }
        ]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SyncMoviesUseCase,
                { provide: MOVIE_REPOSITORY, useValue: mockMovieRepository },
                { provide: STAR_WARS_API_PORT, useValue: mockStarWarsApi },
            ],
        }).compile();

        useCase = module.get<SyncMoviesUseCase>(SyncMoviesUseCase);
    });

    it('debe estar definido', () => {
        expect(useCase).toBeDefined();
    });

    it('debe llamar a la API externa y guardar las películas', async () => {
        const result = await useCase.execute();

        expect(mockStarWarsApi.getMovies).toHaveBeenCalled();
        expect(mockMovieRepository.save).toHaveBeenCalledTimes(2);
        expect(result.success).toBe(true);
    });
});