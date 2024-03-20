import { User } from 'src/user/entities/user.entity';

export abstract class AuthService {
  abstract validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'>>;

  abstract login(
    user: Omit<User, 'password'>,
  ): Promise<{ access_token: string }>;
}
