import { authApi, guessApiMock, themeApiMock } from "../apis";
import { AuthRepositoryImpl, IAuthRepository } from "./auth/auth.repository";
import { IGuessRepository } from "./guess/guess.repository";
import { GuessRepositoryImpl } from "./guess/impl/guess-impl.repository";
import { IThemeRepository } from "./theme/impl/theme-repository";
import { ThemeRepositoryImpl } from "./theme/impl/theme-repository-impl";

const guessRepository: IGuessRepository = new GuessRepositoryImpl(guessApiMock);

const themeRepository: IThemeRepository = new ThemeRepositoryImpl(themeApiMock);

const authRepository: IAuthRepository = new AuthRepositoryImpl(authApi);

export { guessRepository, themeRepository, authRepository };
