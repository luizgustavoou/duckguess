import { IGuess } from './IGuess';

export interface ITheme {
  id: string;
  value: string;
  guesses?: IGuess[];
}
