import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthServiceImpl } from './service/impl/auth.impl.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local-strategy/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserController } from 'src/user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt-strategy/jwt-strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    UserController,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
