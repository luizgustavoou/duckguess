import { IGuessResponse } from "./models/IGuessResponse";

export interface IGuessApi {
  getRandomGameGuess(themeId: string): Promise<IGuessResponse[]>;
}
