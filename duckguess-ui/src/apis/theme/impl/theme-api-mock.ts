import { themeMockResponse } from "../../../utils/theme-mock";
import { IThemeResponse } from "../models/IThemeResponse";
import { IThemeApi } from "../theme-api";

export class ThemeApiMock implements IThemeApi {
    async getAllThemes(): Promise<IThemeResponse[]> {
        return themeMockResponse 
    }
}