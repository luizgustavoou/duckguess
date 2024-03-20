import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthServiceImpl } from './service/impl/auth.impl.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local-strategy/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserController } from 'src/user/user.controller';

@Module({
  imports: [UserModule, PassportModule],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    UserController,
    LocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
