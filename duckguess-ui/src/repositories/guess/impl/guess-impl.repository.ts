import { IGuess } from "../../../entities/IGuess";
import { IGuessRepository } from "../guess.repository";
import { GuessApi } from "../../../apis/guess/guess-api";

export class GuessRepositoryImpl implements IGuessRepository {
  constructor(private readonly guessApi: GuessApi) {}

  async getRandomGameGuess(): Promise<IGuess[]> {
    const res = await this.guessApi.getRandomGameGuess();

    const newRes: IGuess[] = res.map((guess) => {
      return {
        id: guess.id,
        answer: guess.answer,
        hints: guess.hints,
      };
    });

    return newRes;
  }
}
