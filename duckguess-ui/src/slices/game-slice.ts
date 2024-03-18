import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGuess } from "../entities/IGuess";
import { AppDispatch, RootState } from "../store";
import { guessService } from "../services";
import { IPlayer } from "../entities/IPlayer";

interface GameState {
  status: "idle" | "loading" | "playing" | "ended" | "error";
  message: string | null;
  playerOne: IPlayer;
  playerTwo: IPlayer;
  guesses: IGuess[];
  guess: IGuess | null;

  choose: "playerOne" | "playerTwo" | null;
  playerTurn: "playerOne" | "playerTwo" | null;
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
  choose: null,
  playerTurn: null,
  guesses: [],
  guess: null,
};

export const startGame = createAsyncThunk<
  { guesses: IGuess[]; namePlayerOne: string; namePlayerTwo: string },
  { namePlayerOne: string; namePlayerTwo: string; themeId: string },
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("game/start", async (data, thunkAPI) => {
  try {
    const { namePlayerOne, namePlayerTwo, themeId } = data;
    const res = await guessService.getRandomGameGuess(themeId);

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
      state.guess = null;
    },
    resetGuess: (state) => {
      state.guess = null;
    },
    selectGuess: (state, action: PayloadAction<IGuess>) => {
      state.guess = action.payload;
    },
    setChoose: (state, action: PayloadAction<"playerOne" | "playerTwo">) => {
      state.choose = action.payload;
    },
    setPlayerTurn: (
      state,
      action: PayloadAction<"playerOne" | "playerTwo">
    ) => {
      state.playerTurn = action.payload;
    },
    increaseScorePlayerOne: (state, action: PayloadAction<number>) => {
      state.playerOne.score += action.payload;
    },
    increaseScorePlayerTwo: (state, action: PayloadAction<number>) => {
      state.playerTwo.score += action.payload;
    },
    setGuessOpened: (state, action: PayloadAction<string>) => {
      state.guesses = state.guesses.map((guess) => {
        if (guess.id !== action.payload) return guess;

        return {
          ...guess,
          opened: true,
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGame.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(startGame.fulfilled, (state, action) => {
        state.status = "playing";
        state.guesses = action.payload.guesses;
        state.playerOne.name = action.payload.namePlayerOne;
        state.playerTwo.name = action.payload.namePlayerTwo;
        state.choose = "playerOne";
      })
      .addCase(startGame.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      });
  },
});

export const {
  resetGame,
  selectGuess,
  setChoose,
  increaseScorePlayerOne,
  increaseScorePlayerTwo,
  setGuessOpened,
  resetGuess,
  setPlayerTurn,
} = gameSlice.actions;

export const selectGame = (state: RootState) => state.gameReducer;

export default gameSlice.reducer;
