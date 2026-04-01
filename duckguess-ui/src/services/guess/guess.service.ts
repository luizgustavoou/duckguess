import { IGuess } from "../../entities/IGuess";
import { guessMockResponse } from "../../utils/guess-mock";
import { api } from "../../network/api";

export class GuessServiceMock {
  async getRandomGameGuess(_themeId: string): Promise<IGuess[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const guesses: IGuess[] = guessMockResponse
          .sort(() => Math.random() - 0.5)
          .slice(0, 4)
          .map((item) => ({ ...item, opened: false }));
        resolve(guesses);
      }, 1000);
    });
  }

  async getAll(): Promise<IGuess[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(guessMockResponse.map((item) => ({ ...item, opened: true })));
      }, 500);
    });
  }
}

export class GuessServiceApi {
  async getRandomGameGuess(themeId: string): Promise<IGuess[]> {
    const { data } = await api.get<IGuess[]>(`/guess?themeId=${themeId}`);
    return data.map((item: any) => ({ ...item, opened: false }));
  }

  async getAll(): Promise<IGuess[]> {
    const { data } = await api.get<IGuess[]>("/guess");
    return data.map((item: any) => ({ ...item, opened: true }));
  }
}
