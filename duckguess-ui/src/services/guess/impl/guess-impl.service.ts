import { IGuess } from "../../../entities/IGuess";
import { IGuessRepository } from "../../../repositories/guess/guess.repository";
import { IGuessService } from "../guess.service";

export class GuessServiceImpl implements IGuessService {
  constructor(private readonly guessRepository: IGuessRepository) {}

  async getRandomGameGuess(themeId: string): Promise<IGuess[]> {
    try {
      const res = await this.guessRepository.getRandomGameGuess(themeId);

      return res;
    } catch (error) {
      throw error;
    }
  }
}
