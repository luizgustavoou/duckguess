import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGuessDto {
  @IsNotEmpty()
  @MaxLength(12)
  answer: string;
}
