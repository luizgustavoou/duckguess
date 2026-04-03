import { IAuth, ISignin } from "../../types/auth.types";
import { api } from "../../network/api";

export class AuthServiceMock {
  async signin({ email, password }: ISignin): Promise<IAuth> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@admin.com" && password === "admin") {
          resolve({
            access_token: "mocked-jwt",
            user: { id: "1", name: "Admin", email: "admin@admin.com" },
          });
        } else {
          reject(new Error("E-mail ou senha incorretos"));
        }
      }, 500);
    });
  }
}

export class AuthServiceApi {
  async signin({ email, password }: ISignin): Promise<IAuth> {
    const { data } = await api.post<IAuth>("/auth/signin", { email, password });
    return data;
  }
  
  async me(): Promise<any> {
    const { data } = await api.get("/auth/me");
    return data;
  }
}
