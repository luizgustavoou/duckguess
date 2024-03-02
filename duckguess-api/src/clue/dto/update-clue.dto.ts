import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateClueDto } from './create-clue.dto';

export class UpdateClueDto extends PartialType(
  OmitType(CreateClueDto, ['guessId']),
) {}
