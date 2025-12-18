import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../../domain/movie.entity';
import { IMovieRepository } from '../../domain/movie.repository';

@Injectable()
export class TypeOrmMovieRepository implements IMovieRepository {
    constructor(
        @InjectRepository(Movie)
        private readonly ormRepository: Repository<Movie>,
    ) { }

    async findAll(): Promise<Movie[]> {
        return await this.ormRepository.find();
    }

    async findById(id: string): Promise<Movie | null> {
        // Usamos casting a 'any' en el id para evitar conflictos de tipos con UUID en SQLite
        return await this.ormRepository.findOne({
            where: { id: id as any }
        });
    }

    async save(movie: Partial<Movie>): Promise<Movie> {
        // Si viene un título, verificamos si existe para actualizar en lugar de duplicar
        if (movie.title) {
            const existing = await this.ormRepository.findOne({
                where: { title: movie.title }
            });
            if (existing) {
                const merged = this.ormRepository.merge(existing, movie);
                return await this.ormRepository.save(merged);
            }
        }

        const newMovie = this.ormRepository.create(movie);
        return await this.ormRepository.save(newMovie);
    }

    async update(id: string, movie: Partial<Movie>): Promise<Movie> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Película con ID ${id} no encontrada`);
        }

        // Actualizamos los campos
        const updated = this.ormRepository.merge(existing, movie);
        return await this.ormRepository.save(updated);
    }

    async delete(id: string): Promise<void> {
        const result = await this.ormRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Película con ID ${id} no encontrada`);
        }
    }
}