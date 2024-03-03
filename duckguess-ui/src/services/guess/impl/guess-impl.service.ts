import { IGuess } from "../../../entities/IGuess";
import { IGuessRepository } from "../../../repositories/guess/guess.repository";
import { IGuessService } from "../guess.service";

export class GuessServiceImpl implements IGuessService {
  constructor(private readonly guessRepository: IGuessRepository) {}

  async getRandomGameGuess(): Promise<IGuess[]> {
    try {
      const res = await this.guessRepository.getRandomGameGuess();

      return res;
    } catch (error) {
      throw error;
    }
  }
}
