import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGuess } from "../entities/IGuess";
import { AppDispatch, RootState } from "../store";
import { guessService } from "../services";

interface Player {
  name: string;
  score: number;
}

interface GameState {
  status: "idle" | "success" | "loading" | "error";
  message: string | null;
  playerOne: Player;
  playerTwo: Player;
  guesses: IGuess[];
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
};

export const startGame = createAsyncThunk<
  IGuess[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("game/start", async (_, thunkAPI) => {
  try {
    const res = await guessService.getRandomGameGuess();

    return res;
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
    setPlayers: (
      state,
      action: PayloadAction<{ namePlayerOne: string; namePlayerTwo: string }>
    ) => {
      state.playerOne.name = action.payload.namePlayerOne;
      state.playerTwo.name = action.payload.namePlayerTwo;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGame.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(startGame.fulfilled, (state, action) => {
        state.status = "success";
        state.guesses = action.payload;
      })
      .addCase(startGame.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      });
  },
});

export const { setPlayers } = gameSlice.actions;

export const selectGame = (state: RootState) => state.gameReducer;

export default gameSlice.reducer;
