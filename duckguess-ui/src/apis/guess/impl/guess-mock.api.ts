import { guessMockResponse } from "../../../utils/guess-mock";
import { GuessApi } from "../guess-api";
import { IGuessResponse } from "../models/IGuessResponse";

export class GuessApiMock implements GuessApi {
  async getRandomGameGuess(): Promise<IGuessResponse[]> {
    return guessMockResponse;
  }
}
