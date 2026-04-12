import { Hint } from './domain/hint';

export abstract class HintRepository {
  abstract save(hint: Partial<Hint>): Promise<Hint>;
  abstract findAll(): Promise<Hint[]>;
  abstract findOne(id: string): Promise<Hint | null>;
  abstract remove(id: string): Promise<void>;
}
