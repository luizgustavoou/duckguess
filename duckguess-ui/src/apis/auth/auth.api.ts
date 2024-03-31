import axios from "axios";
import { ISigninParams } from "../../types/ISigninParams";
import { IAuthResponse } from "./models/IAuthResponse";

export interface IAuthApi {
  signin(params: ISigninParams): Promise<IAuthResponse>;
}

export class AuthApiImpl implements IAuthApi {
  async signin(params: ISigninParams): Promise<IAuthResponse> {
    const res = await axios.post("/auth/signin", params);

    const data = res.data;

    return data;
  }
}
