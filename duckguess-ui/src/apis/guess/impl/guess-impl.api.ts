import { IGuessApi } from "../guess-api";
import { IGuessResponse } from "../models/IGuessResponse";

export class GuessApiImpl implements IGuessApi {
  getRandomGameGuess(themeId: string): Promise<IGuessResponse[]> {
    throw new Error("Method not implemented.");
  }
}
