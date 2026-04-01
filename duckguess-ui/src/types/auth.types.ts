import { ISigninParams } from "./ISigninParams";

export interface IAuth {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export type ISignin = ISigninParams;
