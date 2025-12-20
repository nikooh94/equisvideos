export interface Movie {
    id: number
    title: string
    episode_id: number
    director: string
    release_date: string
    characters: string[]
    starships: string[]
    planets: string[]
    opening_crawl?: string
    producer?: string
    created?: string
    edited?: string
}

export interface MovieResponse {
    count: number
    next: string | null
    previous: string | null
    results: Movie[]
}