import { IGuess } from "../../entities/IGuess";

export interface IGuessRepository {
  getRandomGameGuess(themeId: string): Promise<IGuess[]>;
}
