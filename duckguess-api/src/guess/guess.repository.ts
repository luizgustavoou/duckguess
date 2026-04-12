import { Guess } from './domain/guess';

export abstract class GuessRepository {
  abstract save(guess: Partial<Guess>): Promise<Guess>;
  abstract findAll(): Promise<Guess[]>;
  abstract findOne(id: string): Promise<Guess | null>;
  abstract findByTheme(themeId: string): Promise<Guess[]>;
  abstract count(): Promise<number>;
  abstract remove(id: string): Promise<void>;
}
