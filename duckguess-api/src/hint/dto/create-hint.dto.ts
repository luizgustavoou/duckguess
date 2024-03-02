import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateHintDto {
  @IsNotEmpty()
  text: string;

  @IsUUID()
  guessId: string;
}
