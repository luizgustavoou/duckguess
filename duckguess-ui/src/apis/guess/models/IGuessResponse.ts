import { IHintResponse } from "../../hint/models/IHintResponse";

export interface IGuessResponse {
  id: string;
  answer: string;
  hints: IHintResponse[];
}
