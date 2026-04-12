import { Module } from '@nestjs/common';
import { GuessController } from './guess.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuessEntity } from './entities/guess.entity';
import { GuessService, GuessServiceImpl } from './guess.service';
import { ThemeModule } from 'src/theme/theme.module';
import { GuessRepository } from './guess.repository';
import { GuessRepositoryTypeORM } from './guess.repository.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GuessEntity]), ThemeModule],
  controllers: [GuessController],
  providers: [
    {
      provide: GuessService,
      useClass: GuessServiceImpl,
    },
    {
      provide: GuessRepository,
      useClass: GuessRepositoryTypeORM,
    },
  ],
  exports: [GuessService, GuessRepository],
})
export class GuessModule {}
