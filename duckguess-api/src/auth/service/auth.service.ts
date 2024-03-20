export abstract class AuthService {
  abstract validateUser(email: string, pass: string): Promise<any>;

  abstract login(user: any): Promise<{ access_token: string }>;
}
