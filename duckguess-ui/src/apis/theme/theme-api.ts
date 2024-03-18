import { IThemeResponse } from "./models/IThemeResponse";

export interface IThemeApi {
  getAllThemes(): Promise<IThemeResponse[]>;
}
