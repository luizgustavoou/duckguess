import { IGuessResponse } from "./models/IGuessResponse";

export interface GuessApi {
  getRandomGameGuess(): Promise<IGuessResponse[]>;
}
