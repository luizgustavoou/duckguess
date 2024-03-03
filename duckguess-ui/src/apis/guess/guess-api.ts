import { IGuessResponse } from "./models/IGuessResponse";

export interface IGuessApi {
  getRandomGameGuess(): Promise<IGuessResponse[]>;
}
