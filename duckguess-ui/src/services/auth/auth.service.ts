import { IAuth, ISignin } from "../../types/auth.types";

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
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Falha ao realizar login.");
    }
    return await response.json();
  }
}
