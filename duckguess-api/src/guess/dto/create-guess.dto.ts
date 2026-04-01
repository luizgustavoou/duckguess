import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GuessHintDto {
  @IsNotEmpty()
  @MaxLength(45)
  text: string;
}

export class CreateGuessDto {
  @IsNotEmpty()
  @MaxLength(12)
  answer: string;

  @IsUUID()
  themeId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GuessHintDto)
  hints?: GuessHintDto[];
}
