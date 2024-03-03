import { createSlice } from "@reduxjs/toolkit";
import { IGuess } from "../entities/IGuess";
import { RootState } from "../store";

interface GameState {
  playerOne: string | null;
  playerTwo: string | null;
  guesses: IGuess[];
}

const initialState: GameState = {
  playerOne: null,
  playerTwo: null,
  guesses: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
});

export const {} = gameSlice.actions;

export const selectGame = (state: RootState) => state.gameReducer;

export default gameSlice.reducer;
