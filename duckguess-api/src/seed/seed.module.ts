import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ThemeModule } from '../theme/theme.module';
import { GuessModule } from '../guess/guess.module';
import { HintModule } from '../hint/hint.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ThemeModule, GuessModule, HintModule, UserModule],
  providers: [SeedService],
})
export class SeedModule {}
