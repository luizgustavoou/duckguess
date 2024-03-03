import { IGuess } from "../../../entities/IGuess";
import { IGuessRepository } from "../../../repositories/guess/guess.repository";
import { IGuessService } from "../guess.service";

export class GuessServiceImpl implements IGuessService {
  constructor(private readonly guessRepository: IGuessRepository) {}

  async getRandomGameGuess(): Promise<IGuess[]> {
    throw new Error("erro krai");
  }
}
