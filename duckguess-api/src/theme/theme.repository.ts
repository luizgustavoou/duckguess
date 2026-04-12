import { Theme } from './domain/theme';

export abstract class ThemeRepository {
  abstract save(theme: Partial<Theme>): Promise<Theme>;
  abstract findAll(): Promise<Theme[]>;
  abstract findOne(id: string): Promise<Theme | null>;
  abstract findByValue(value: string): Promise<Theme | null>;
  abstract remove(id: string): Promise<void>;
  abstract findRandom(): Promise<Theme | null>;
}
