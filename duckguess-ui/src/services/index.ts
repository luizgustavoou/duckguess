import { GuessServiceApi } from "./guess/guess.service";
import { ThemeServiceApi } from "./theme/theme.service";
import { AuthServiceApi } from "./auth/auth.service";
import { JWTServiceImpl } from "./jwt/jwt.service";
import { LocalStorageService } from "./storage/storage.service";

const guessService = new GuessServiceApi();
// To use mock instead: import { GuessServiceMock } from "./guess/guess.service"; const guessService = new GuessServiceMock();

const themeService = new ThemeServiceApi();
const authService = new AuthServiceApi();

const storageService = new LocalStorageService();
const jwtService = new JWTServiceImpl();

export { guessService, themeService, authService, storageService, jwtService };
