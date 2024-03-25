import { Module } from '@nestjs/common';
import { GuessController } from './guess.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guess } from './entities/guess.entity';
import { GuessService, GuessServiceImpl } from './guess.service';
import { ThemeModule } from 'src/theme/theme.module';

@Module({
  imports: [TypeOrmModule.forFeature([Guess]), ThemeModule],
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
