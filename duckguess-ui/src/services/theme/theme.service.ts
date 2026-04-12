import { ITheme } from "../../entities/ITheme";
import { api } from "../../network/api";

const themeMockResponde: ITheme[] = [
  { 
    id: "1", 
    value: "Tecnologia",
    guesses: [
      {
        id: "g1",
        answer: "Computador",
        opened: false,
        hints: [
          { id: "h1", text: "Tem teclado" },
          { id: "h2", text: "Tem tela" },
          { id: "h3", text: "Processa dados" },
        ]
      }
    ]
  },
  { 
    id: "2", 
    value: "Animais",
    guesses: [
      {
        id: "g2",
        answer: "Cachorro",
        opened: false,
        hints: [
          { id: "h4", text: "Melhor amigo do homem" },
          { id: "h5", text: "Late" },
          { id: "h6", text: "Gosta de ossos" },
        ]
      }
    ]
  },
  { id: "3", value: "Capitais do Mundo", guesses: [] },
  { id: "4", value: "Comidas", guesses: [] },
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
