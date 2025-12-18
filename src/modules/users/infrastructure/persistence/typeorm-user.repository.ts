import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';
import { IUserRepository } from '../../domain/user.repository';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly ormRepository: Repository<User>,
    ) { }

    async save(user: Partial<User>): Promise<User> {
        const newUser = this.ormRepository.create(user);
        return this.ormRepository.save(newUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.ormRepository.findOne({ where: { email } });
    }

    async findById(id: string): Promise<User | null> {
        return this.ormRepository.findOne({ where: { id } as any });
    }
}