export interface StarWarsMovieData {
    title: string;
    director: string;
    producer: string;
    opening_crawl: string;
    release_date: string;
}

export interface IStarWarsApiPort {
    getMovies(): Promise<StarWarsMovieData[]>;
}

export const STAR_WARS_API_PORT = 'STAR_WARS_API_PORT';