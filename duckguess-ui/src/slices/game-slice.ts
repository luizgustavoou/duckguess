import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGuess } from "../entities/IGuess";
import { AppDispatch, RootState } from "../store";
import { guessService } from "../services";
import { IPlayer } from "../entities/IPlayer";

interface GameState {
  status: "idle" | "success" | "loading" | "error";
  message: string | null;
  playerOne: IPlayer;
  playerTwo: IPlayer;
  guesses: IGuess[];
  guess: IGuess | null;
}

const initialState: GameState = {
  status: "idle",
  message: null,
  playerOne: {
    name: "",
    score: 0,
  },
  playerTwo: {
    name: "",
    score: 0,
  },
  guesses: [],
  guess: null,
};

export const startGame = createAsyncThunk<
  { guesses: IGuess[]; namePlayerOne: string; namePlayerTwo: string },
  { namePlayerOne: string; namePlayerTwo: string },
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("game/start", async (data, thunkAPI) => {
  try {
    const { namePlayerOne, namePlayerTwo } = data;
    const res = await guessService.getRandomGameGuess();

    return { guesses: res, namePlayerOne, namePlayerTwo };
  } catch (error: any) {
    console.log({ error });
    let errorMessage = "Ocorreu algum erro. Por favor, tente mais tarde.";

    // if (error instanceof HttpError) errorMessage = error.message;

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: (state) => {
      state.guesses = [];
      state.playerOne = { name: "", score: 0 };
      state.playerTwo = { name: "", score: 0 };
      state.status = "idle";
      state.message = null;
    },
    selectGuess: (state, action: PayloadAction<IGuess>) => {
      state.guess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGame.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(startGame.fulfilled, (state, action) => {
        state.status = "success";
        state.guesses = action.payload.guesses;
        state.playerOne.name = action.payload.namePlayerOne;
        state.playerTwo.name = action.payload.namePlayerTwo;
      })
      .addCase(startGame.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      });
  },
});

export const { resetGame, selectGuess } = gameSlice.actions;

export const selectGame = (state: RootState) => state.gameReducer;

export default gameSlice.reducer;
