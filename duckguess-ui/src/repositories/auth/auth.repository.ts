import { ISigninParams } from "../../types/ISigninParams";
import { IAuthResponse } from "../../apis/auth/models/IAuthResponse";
import { IAuthApi } from "../../apis/auth/auth.api";

export interface IAuthRepository {
  signin(params: ISigninParams): Promise<IAuthResponse>;
}

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private authApi: IAuthApi) {}

  async signin(params: ISigninParams): Promise<IAuthResponse> {
    const res = await this.authApi.signin(params);

    return res;
  }
}
