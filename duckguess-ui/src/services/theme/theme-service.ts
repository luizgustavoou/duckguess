import { ITheme } from "../../entities/ITheme";

export interface IThemeService {
  getAllThemes(): Promise<ITheme[]>;
}
