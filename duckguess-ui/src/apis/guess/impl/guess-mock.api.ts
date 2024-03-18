import { guessMockResponse } from "../../../utils/guess-mock";
import { IGuessApi } from "../guess-api";
import { IGuessResponse } from "../models/IGuessResponse";

export class GuessApiMock implements IGuessApi {
  async getRandomGameGuess(themeId: string): Promise<IGuessResponse[]> {
    return guessMockResponse;
  }
}
