import { Module } from '@nestjs/common';
import { ClueService } from './clue.service';
import { ClueController } from './clue.controller';

@Module({
  controllers: [ClueController],
  providers: [ClueService],
})
export class ClueModule {}
