import { ISigninParams } from "../../types/ISigninParams";
import { IAuthResponse } from "./models/IAuthResponse";
import { api } from "../../network/api";

export interface IAuthApi {
  signin(params: ISigninParams): Promise<IAuthResponse>;
}

export class AuthApiImpl implements IAuthApi {
  async signin(params: ISigninParams): Promise<IAuthResponse> {
    const res = await api.post("/auth/signin", params);

    const data = res.data;

    return data;
  }
}
