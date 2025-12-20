import { useState, useEffect, useCallback } from 'react'
import apiClient from './api.client'
import type { Movie, MovieResponse } from '@interfaces/movie.interface'

interface UseMoviesOptions {
    page?: number
    limit?: number
    search?: string
    episode?: number
}

interface UseMoviesReturn {
    movies: Movie[]
    isLoading: boolean
    error: string | null
    totalPages: number
    currentPage: number
    refetch: () => Promise<void>
    deleteMovie: (id: number) => Promise<boolean>
    addMovie: (movie: Omit<Movie, 'id'>) => Promise<Movie | null>
}

export const useMovies = (options: UseMoviesOptions = {}): UseMoviesReturn => {
    const { page = 1, limit = 10, search = '', episode } = options

    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(page)

    const fetchMovies = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            // Datos mock temporalmente hasta tener backend
            setTimeout(() => {
                const mockMovies: Movie[] = [
                    {
                        id: 1,
                        title: 'A New Hope',
                        episode_id: 4,
                        director: 'George Lucas',
                        release_date: '1977-05-25',
                        characters: ['Luke Skywalker', 'Leia Organa', 'Han Solo'],
                        starships: ['X-Wing', 'Millennium Falcon'],
                        planets: ['Tatooine', 'Alderaan', 'Yavin 4']
                    },
                    {
                        id: 2,
                        title: 'The Empire Strikes Back',
                        episode_id: 5,
                        director: 'Irvin Kershner',
                        release_date: '1980-05-21',
                        characters: ['Luke Skywalker', 'Darth Vader', 'Yoda'],
                        starships: ['X-Wing', 'Imperial Star Destroyer'],
                        planets: ['Hoth', 'Dagobah', 'Bespin']
                    }
                ]

                // Filtrar según búsqueda
                let filtered = mockMovies
                if (search) {
                    filtered = filtered.filter(movie =>
                        movie.title.toLowerCase().includes(search.toLowerCase()) ||
                        movie.director.toLowerCase().includes(search.toLowerCase())
                    )
                }
                if (episode) {
                    filtered = filtered.filter(movie => movie.episode_id === episode)
                }

                setMovies(filtered)
                setTotalPages(1)
                setCurrentPage(1)
                setIsLoading(false)
            }, 500)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido')
            console.error('Error fetching movies:', err)
            setIsLoading(false)
        }
    }, [page, limit, search, episode])

    const deleteMovie = async (id: number): Promise<boolean> => {
        try {
            // Simular llamada API
            await new Promise(resolve => setTimeout(resolve, 300))
            setMovies(prev => prev.filter(movie => movie.id !== id))
            return true
        } catch (err) {
            console.error('Error deleting movie:', err)
            return false
        }
    }

    const addMovie = async (movieData: Omit<Movie, 'id'>): Promise<Movie | null> => {
        try {
            // Simular llamada API
            await new Promise(resolve => setTimeout(resolve, 300))
            const newMovie: Movie = {
                ...movieData,
                id: Date.now() // ID temporal
            }
            setMovies(prev => [newMovie, ...prev])
            return newMovie
        } catch (err) {
            console.error('Error adding movie:', err)
            return null
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [fetchMovies])

    return {
        movies,
        isLoading,
        error,
        totalPages,
        currentPage,
        refetch: fetchMovies,
        deleteMovie,
        addMovie
    }
}