export const API_CONFIG = {
    BASE_URL: 'http://localhost:3000',
    ENDPOINTS: {
        MOVIES: '/movies',
        MOVIE_BY_ID: (id: number) => `/movies/${id}`,
        CHARACTERS: '/characters',
        PLANETS: '/planets',
        STARSHIPS: '/starships',
    }
} as const

// Endpoints alternativos si NestJS tiene prefijo /api
export const API_CONFIG_V2 = {
    BASE_URL: 'http://localhost:3000/api',
    ENDPOINTS: {
        MOVIES: '/movies',
        MOVIE_BY_ID: (id: number) => `/movies/${id}`,
    }
} as const