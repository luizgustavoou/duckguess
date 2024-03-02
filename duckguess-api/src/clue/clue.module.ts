import { Module } from '@nestjs/common';

import { ClueController } from './clue.controller';
import { ClueService } from './services/clue.service';
import { ClueServiceImpl } from './services/impl/clue.impl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clue } from './entities/clue.entity';
import { GuessModule } from 'src/guess/guess.module';

@Module({
  imports: [TypeOrmModule.forFeature([Clue]), GuessModule],
  controllers: [ClueController],
  providers: [
    {
      provide: ClueService,
      useClass: ClueServiceImpl,
    },
  ],
})
export class ClueModule {}
