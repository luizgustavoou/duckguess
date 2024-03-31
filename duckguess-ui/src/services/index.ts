import {
  authRepository,
  guessRepository,
  themeRepository,
} from "../repositories";
import { AuthServiceImpl, IAuthService } from "./auth/auth.service";
import { IGuessService } from "./guess/guess.service";
import { GuessServiceImpl } from "./guess/impl/guess-impl.service";
import { JWTService, JWTServiceImpl } from "./jwt/jwt.service";
import {
  IStorageService,
  LocalStorageService,
} from "./storage/storage.service";
import { ThemeServiceImpl } from "./theme/impl/theme-service-impl";
import { IThemeService } from "./theme/theme-service";

const guessService: IGuessService = new GuessServiceImpl(guessRepository);

const themeService: IThemeService = new ThemeServiceImpl(themeRepository);

const authService: IAuthService = new AuthServiceImpl(authRepository);

const storageService: IStorageService = new LocalStorageService();

const jwtService: JWTService = new JWTServiceImpl();

export { guessService, themeService, authService, storageService, jwtService };
