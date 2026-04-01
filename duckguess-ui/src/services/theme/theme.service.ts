import { ITheme } from "../../entities/ITheme";

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
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/theme`);
    if (!response.ok) throw new Error("Falha ao buscar os temas.");
    return await response.json();
  }
}
