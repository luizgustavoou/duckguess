import { IGuessApi } from "./guess/guess-api";
import { GuessApiImpl } from "./guess/impl/guess-impl.api";
import { GuessApiMock } from "./guess/impl/guess-mock.api";
import { ThemeApiImpl } from "./theme/impl/theme-api-impl";
import { ThemeApiMock } from "./theme/impl/theme-api-mock";
import { IThemeApi } from "./theme/theme-api";

const guessApi: IGuessApi = new GuessApiImpl();

const guessApiMock: IGuessApi = new GuessApiMock();

const themeApiMock: IThemeApi = new ThemeApiMock();

const themeApi: IThemeApi = new ThemeApiImpl();

export { guessApi, guessApiMock, themeApi, themeApiMock };
