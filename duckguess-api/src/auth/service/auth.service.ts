import { User } from 'src/user/entities/user.entity';
import { SignupDto } from '../dtos/signup.dto';

export abstract class AuthService {
  abstract validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'>>;

  abstract signin(
    user: Omit<User, 'password'>,
  ): Promise<{ access_token: string }>;

  abstract signup(signupDto: SignupDto): Promise<User>;
}
