import { ISigninParams } from "../../types/ISigninParams";
import { IAuthResponse } from "../../apis/auth/models/IAuthResponse";
import { IAuthApi } from "../../apis/auth/auth.api";

export interface IAuthService {
  signin(params: ISigninParams): Promise<IAuthResponse>;
}

export class AuthServiceImpl implements IAuthService {
  constructor(private authApi: IAuthApi) {}

  async signin(params: ISigninParams): Promise<IAuthResponse> {
    try {
      const res = await this.authApi.signin(params);

      return res;
    } catch (error) {
      throw error;
    }
  }
}
