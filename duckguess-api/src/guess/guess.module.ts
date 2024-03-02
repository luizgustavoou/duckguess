import { Module } from '@nestjs/common';
import { GuessController } from './guess.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guess } from './entities/guess.entity';
import { GuessServiceImpl } from './services/impl/guess.impl.service';
import { GuessService } from './services/guess.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guess])],
  controllers: [GuessController],
  providers: [
    {
      provide: GuessService,
      useClass: GuessServiceImpl,
    },
  ],
  exports: [GuessService],
})
export class GuessModule {}
