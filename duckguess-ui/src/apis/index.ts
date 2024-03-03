import { IGuessApi } from "./guess/guess-api";
import { GuessApiImpl } from "./guess/impl/guess-impl.api";
import { GuessApiMock } from "./guess/impl/guess-mock.api";

const guessApi: IGuessApi = new GuessApiImpl();

const guessApiMock: IGuessApi = new GuessApiMock();

export { guessApi, guessApiMock };
