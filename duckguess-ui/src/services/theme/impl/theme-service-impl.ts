import { ITheme } from "../../../entities/ITheme";
import { IThemeRepository } from "../../../repositories/theme/impl/theme-repository";
import { IThemeService } from "../theme-service";

export class ThemeServiceImpl implements IThemeService {
  constructor(private readonly themeRepository: IThemeRepository) {}

  async getAllThemes(): Promise<ITheme[]> {
    try {
      const res = await this.themeRepository.getAllThemes();

      return res;
    } catch (error) {
      throw error;
    }
  }
}
