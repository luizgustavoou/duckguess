import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
