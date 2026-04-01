import { IHint } from "./IHint";
import { ITheme } from "./ITheme";

export interface IGuess {
  id: string;
  answer: string;
  hints: IHint[];
  opened: boolean;
  theme?: ITheme;
}
