import { User } from './domain/user';

export abstract class UserRepository {
  abstract save(user: Partial<User>): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOneById(id: string): Promise<User | null>;
  abstract findOneByEmail(email: string): Promise<User | null>;
  abstract remove(id: string): Promise<void>;
}
