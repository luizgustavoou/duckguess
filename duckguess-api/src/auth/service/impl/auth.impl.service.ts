import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
