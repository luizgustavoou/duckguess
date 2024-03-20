import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthServiceImpl } from './service/impl/auth.impl.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local-strategy/local-strategy';

@Module({
  imports: [UserModule], 
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    LocalStrategy,
  ],
})
export class AuthModule {}
