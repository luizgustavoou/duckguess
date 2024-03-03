import { GuessApi } from "../guess.api";
import { IGuessResponse } from "../models/IGuessResponse";

export class GuessApiImpl implements GuessApi {
    getRandomGameGuess(): Promise<IGuessResponse[]> {
        throw new Error("Method not implemented.");
    }
}
