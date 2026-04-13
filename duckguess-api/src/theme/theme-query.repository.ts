import { IThemeDto } from './application/theme.dto';

export abstract class ThemeQueryRepository {
  abstract findAllWithGuesses(): Promise<IThemeDto[]>;
}
