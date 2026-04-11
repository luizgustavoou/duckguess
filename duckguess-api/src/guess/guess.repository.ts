import { Guess } from './entities/guess.entity';

export abstract class GuessRepository {
  abstract create(guess: Partial<Guess>): Promise<Guess>;
  abstract findAll(): Promise<Guess[]>;
  abstract findOne(id: string): Promise<Guess | null>;
  abstract update(id: string, guess: Partial<Guess>): Promise<Guess | null>;
  abstract remove(id: string): Promise<void>;
  abstract findByTheme(themeId: string): Promise<Guess[]>;
}
