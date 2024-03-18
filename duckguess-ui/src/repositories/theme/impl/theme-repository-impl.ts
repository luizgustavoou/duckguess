import { IThemeApi } from "../../../apis/theme/theme-api";
import { ITheme } from "../../../entities/ITheme";
import { IThemeRepository } from "./theme-repository";

export class ThemeRepositoryImpl implements IThemeRepository {
  constructor(private readonly themeApi: IThemeApi) {}

  async getAllThemes(): Promise<ITheme[]> {
    const res = await this.themeApi.getAllThemes();

    const newRes: ITheme[] = res.map((themeResponse) => ({
      id: themeResponse.id,
      value: themeResponse.value,
    }));

    return newRes;
  }
}
