import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { GuessModule } from 'src/guess/guess.module';
import { HintService, HintServiceImpl } from './hint.service';
import { Hint } from './entities/hint.entity';
import { HintController } from './hint.controller';
import { HintRepository, HintRepositoryImpl } from './hint.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Hint]), GuessModule],
  controllers: [HintController],
  providers: [
    {
      provide: HintRepository,
      useClass: HintRepositoryImpl,
    },
    {
      provide: HintService,
      useClass: HintServiceImpl,
    },
  ],
})
export class HintModule {}
