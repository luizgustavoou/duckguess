import { Module } from '@nestjs/common';
import { AuthService, AuthServiceImpl } from './auth.service';
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
import { RolesGuard } from './roles.guard';
import { WsJwtGuard } from './ws-jwt.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' },
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
    WsJwtGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [WsJwtGuard, JwtModule]
})
export class AuthModule { }
