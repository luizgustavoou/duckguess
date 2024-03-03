import { guessApiMock } from "../apis";
import { IGuessRepository } from "./guess/guess.repository";
import { GuessRepositoryImpl } from "./guess/impl/guess-impl.repository";

const guessRepository: IGuessRepository = new GuessRepositoryImpl(guessApiMock);

export { guessRepository };
