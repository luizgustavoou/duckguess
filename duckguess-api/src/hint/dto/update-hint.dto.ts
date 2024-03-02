import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateHintDto } from './create-hint.dto';

export class UpdateHintDto extends PartialType(
  OmitType(CreateHintDto, ['guessId']),
) {}
