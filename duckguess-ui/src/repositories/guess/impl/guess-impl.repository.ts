import { IGuessApi } from "../../../apis/guess/guess-api";
import { IGuess } from "../../../entities/IGuess";
import { IGuessRepository } from "../guess.repository";

export class GuessRepositoryImpl implements IGuessRepository {
  constructor(private readonly guessApi: IGuessApi) {}

  async getRandomGameGuess(themeId: string): Promise<IGuess[]> {
    const res = await this.guessApi.getRandomGameGuess(themeId);

    const newRes: IGuess[] = res.map((guess) => {
      return {
        id: guess.id,
        answer: guess.answer,
        hints: guess.hints,
        opened: false,
      };
    });

    return newRes;
  }
}
