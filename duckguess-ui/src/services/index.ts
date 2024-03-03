import { guessRepository } from "../repositories";
import { IGuessService } from "./guess/guess.service";
import { GuessServiceImpl } from "./guess/impl/guess-impl.service";

const guessService: IGuessService = new GuessServiceImpl(guessRepository);

export { guessService };
