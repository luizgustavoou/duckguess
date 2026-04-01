import { ITheme } from "../../entities/ITheme";
import { api } from "../../network/api";

const themeMockResponde: ITheme[] = [
  { id: "1", value: "Tecnologia" },
  { id: "2", value: "Animais" },
  { id: "3", value: "Capitais do Mundo" },
  { id: "4", value: "Comidas" },
];

export class ThemeServiceMock {
  async getAllThemes(): Promise<ITheme[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(themeMockResponde);
      }, 500);
    });
  }
}
export class ThemeServiceApi {
  async getAllThemes(): Promise<ITheme[]> {
    const { data } = await api.get<ITheme[]>("/theme");
    return data;
  }

  async createTheme(value: string): Promise<ITheme> {
    const { data } = await api.post<ITheme>("/theme", { value });
    return data;
  }
}
