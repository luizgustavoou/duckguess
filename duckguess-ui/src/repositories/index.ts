import { guessApiMock, themeApiMock } from "../apis";
import { IGuessRepository } from "./guess/guess.repository";
import { GuessRepositoryImpl } from "./guess/impl/guess-impl.repository";
import { IThemeRepository } from "./theme/impl/theme-repository";
import { ThemeRepositoryImpl } from "./theme/impl/theme-repository-impl";

const guessRepository: IGuessRepository = new GuessRepositoryImpl(guessApiMock);

const themeRepository: IThemeRepository = new ThemeRepositoryImpl(themeApiMock);

export { guessRepository, themeRepository };
