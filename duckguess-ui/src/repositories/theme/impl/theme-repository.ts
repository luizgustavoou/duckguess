import { ITheme } from "../../../entities/ITheme";

export interface IThemeRepository {
  getAllThemes(): Promise<ITheme[]>;
}
