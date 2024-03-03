import { guessRepository } from "../repositories";
import { GuessRepositoryImpl } from "../repositories/guess/impl/guess-impl.repository";
import { IGuessService } from "./guess/guess.service";

const guessService: IGuessService = new GuessRepositoryImpl(guessRepository);

export { guessService };
