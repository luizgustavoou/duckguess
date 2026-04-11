import { Theme } from './entities/theme.entity';

export abstract class ThemeRepository {
  abstract create(theme: Partial<Theme>): Promise<Theme>;
  abstract findAll(): Promise<Theme[]>;
  abstract findOne(id: string): Promise<Theme | null>;
  abstract update(id: string, theme: Partial<Theme>): Promise<Theme | null>;
  abstract remove(id: string): Promise<void>;
  abstract findRandom(): Promise<Theme | null>;
}
