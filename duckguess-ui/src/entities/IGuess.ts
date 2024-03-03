import { IHint } from "./IHint";

export interface IGuess {
  id: string;
  answer: string;
  hints: IHint[];
}
