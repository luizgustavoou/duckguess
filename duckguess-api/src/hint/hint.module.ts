import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuessModule } from 'src/guess/guess.module';
import { HintService, HintServiceImpl } from './hint.service';
import { HintEntity } from './entities/hint.entity';
import { HintController } from './hint.controller';
import { HintRepository } from './hint.repository';
import { HintRepositoryTypeORM } from './hint.repository.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HintEntity]), GuessModule],
  controllers: [HintController],
  providers: [
    {
      provide: HintRepository,
      useClass: HintRepositoryTypeORM,
    },
    {
      provide: HintService,
      useClass: HintServiceImpl,
    },
  ],
  exports: [HintRepository, HintService],
})
export class HintModule {}
