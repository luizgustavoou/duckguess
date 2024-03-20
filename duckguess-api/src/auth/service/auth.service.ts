export abstract class AuthService {
  abstract validateUser(email: string, pass: string): Promise<any>;
}
