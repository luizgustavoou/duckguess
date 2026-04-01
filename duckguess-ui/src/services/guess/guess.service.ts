import { IGuess } from "../../entities/IGuess";
import { guessMockResponse } from "../../utils/guess-mock";

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
}

export class GuessServiceApi {
  async getRandomGameGuess(themeId: string): Promise<IGuess[]> {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/guess?themeId=${themeId}`);
    if (!response.ok) throw new Error("Falha ao buscar as adivinhações do tema.");
    const data = await response.json();
    return data.map((item: any) => ({ ...item, opened: false }));
  }
}
