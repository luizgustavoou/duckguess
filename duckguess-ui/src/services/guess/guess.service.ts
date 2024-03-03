import { IGuess } from "../../entities/IGuess";

export interface IGuessService {
  getRandomGameGuess(): Promise<IGuess[]>;
}
