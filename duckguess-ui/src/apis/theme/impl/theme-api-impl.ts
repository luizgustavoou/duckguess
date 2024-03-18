import { IThemeResponse } from "../models/IThemeResponse";
import { IThemeApi } from "../theme-api";

export class ThemeApiImpl implements IThemeApi {
  getAllThemes(): Promise<IThemeResponse[]> {
    throw new Error("Method not implemented.");
  }
}
