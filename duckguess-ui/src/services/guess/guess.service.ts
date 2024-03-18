import { IGuess } from "../../entities/IGuess";

export interface IGuessService {
  getRandomGameGuess(themeId: string): Promise<IGuess[]>;
}
