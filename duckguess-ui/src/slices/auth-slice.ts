import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { authService, jwtService, storageService } from "../services";
import { IAuth } from "../types/auth.types";
import { ISigninParams } from "../types/ISigninParams";

export interface IUserAuth {
  id: string;
  email: string;
}

export interface IJwtDecoded {
  email: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

function parseJwtToUser(decoded: IJwtDecoded) {
  const user = {
    id: decoded.sub,
    email: decoded.email,
  };

  return user;
}

interface IUserState {
  status: "idle" | "loading" | "success" | "error";
  user: IUserAuth | null;
}

const accessToken = storageService.getItem("accessToken");

const userJwt: IJwtDecoded | null = accessToken
  ? jwtService.decode(accessToken)
  : null;

const user = userJwt ? parseJwtToUser(userJwt) : userJwt;

const initialState: IUserState = {
  status: "idle",
  user,
};

export const signin = createAsyncThunk<
  IAuth,
  ISigninParams,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("auth/signin", async (data, thunkAPI) => {
  try {
    const res = await authService.signin(data);

    storageService.setItem("accessToken", res.access_token);

    return res;
  } catch (error: any) {
    console.log({ error });
    let errorMessage = "Ocorreu algum erro. Por favor, tente mais tarde.";

    // if (error instanceof HttpError) errorMessage = error.message;

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const validateAuth = createAsyncThunk<
  any,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("auth/validateAuth", async (_, thunkAPI) => {
  try {
    const accessToken = storageService.getItem("accessToken");
    if (!accessToken) {
      return thunkAPI.rejectWithValue("No access token.");
    }
    const res = await authService.me();
    return res;
  } catch (error: any) {
    storageService.removeItem("accessToken");
    return thunkAPI.rejectWithValue("O token expirou ou é inválido.");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
        storageService.removeItem("accessToken");
        state.user = null;
        state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(signin.fulfilled, (state, action) => {
        const userJwt: IJwtDecoded = jwtService.decode(
          action.payload.access_token
        );

        state.user = parseJwtToUser(userJwt);

        state.status = "success";
      })
      .addCase(signin.rejected, (state, _) => {
        state.status = "error";
      })
      .addCase(validateAuth.rejected, (state, _) => {
        state.user = null;
        state.status = "error";
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authReducer;

export default authSlice.reducer;
