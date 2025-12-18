import { User } from './user.entity';

export interface IUserRepository {
    save(user: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';