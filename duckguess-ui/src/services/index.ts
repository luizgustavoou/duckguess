import { guessRepository, themeRepository } from "../repositories";
import { IGuessService } from "./guess/guess.service";
import { GuessServiceImpl } from "./guess/impl/guess-impl.service";
import { ThemeServiceImpl } from "./theme/impl/theme-service-impl";
import { IThemeService } from "./theme/theme-service";

const guessService: IGuessService = new GuessServiceImpl(guessRepository);

const themeService: IThemeService = new ThemeServiceImpl(themeRepository);

export { guessService, themeService };
