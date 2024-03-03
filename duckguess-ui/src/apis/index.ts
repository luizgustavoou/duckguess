import { GuessApi } from "./guess/guess-api";
import { GuessApiImpl } from "./guess/impl/guess-impl.api";
import { GuessApiMock } from "./guess/impl/guess-mock.api";

const guessApi: GuessApi = new GuessApiImpl();

const guessApiMock: GuessApi = new GuessApiMock();

export { guessApi, guessApiMock };
