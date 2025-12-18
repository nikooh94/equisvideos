import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password?: string; // El ? es porque no queremos que viaje en todas las consultas por seguridad

    @Column({
        type: 'text',
        default: UserRole.REGULAR,
    })
    role: UserRole;
}