import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateHintDto {
  @IsNotEmpty()
  @MaxLength(45)
  text: string;

  @IsUUID()
  guessId: string;
}
