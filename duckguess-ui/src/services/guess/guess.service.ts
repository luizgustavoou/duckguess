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

  async create(answer: string, _themeId: string): Promise<IGuess> {
    return {
      id: Math.random().toString(36).substr(2, 9),
      answer,
      hints: [],
      opened: true,
    };
  }

  async update(id: string, answer: string): Promise<IGuess> {
    const existing = guessMockResponse.find(g => g.id === id);
    return {
      ...existing!,
      answer,
      opened: true,
    };
  }

  async delete(_id: string): Promise<void> {
    return;
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

  async create(answer: string, themeId: string, hints: {text: string}[]): Promise<IGuess> {
    const { data } = await api.post<IGuess>("/guess", { answer, themeId, hints });
    return data;
  }

  async update(id: string, answer: string): Promise<IGuess> {
    const { data } = await api.patch<IGuess>(`/guess/${id}`, { answer });
    return data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/guess/${id}`);
  }
}
