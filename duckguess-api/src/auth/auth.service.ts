import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { SignupDto } from 'src/auth/dtos/signup.dto';
import { UserService } from 'src/user/user.service';

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

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOneByEmail(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async signup(signupDto: SignupDto): Promise<User> {
    const user = await this.userService.create(signupDto);

    return user;
  }

  async signin(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
