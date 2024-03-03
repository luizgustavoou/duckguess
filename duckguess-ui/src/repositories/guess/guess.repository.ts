import { IGuess } from "../../entities/IGuess";

export interface IGuessRepository {
  getRandomGameGuess(): Promise<IGuess[]>;
}
