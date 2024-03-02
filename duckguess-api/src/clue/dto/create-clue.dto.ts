import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateClueDto {
  @IsNotEmpty()
  hint: string;

  @IsUUID()
  guessId: string;
}
