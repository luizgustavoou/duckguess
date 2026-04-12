import { ThemeEntity } from './entities/theme.entity';

export abstract class ThemeQuery {
  abstract findAllWithGuesses(): Promise<ThemeEntity[]>;
}
