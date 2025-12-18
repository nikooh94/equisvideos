import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    director: string;

    @Column({ nullable: true })
    producer: string;

    @Column({ nullable: true })
    opening_crawl: string;

    @Column({ nullable: true })
    release_date: string;
}