import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Theme } from '../theme/entities/theme.entity';
import { Guess } from '../guess/entities/guess.entity';
import { Hint } from '../hint/entities/hint.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theme, Guess, Hint, User])],
  providers: [SeedService],
})
export class SeedModule {}
