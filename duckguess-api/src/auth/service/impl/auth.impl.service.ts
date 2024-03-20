import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

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

  async login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
