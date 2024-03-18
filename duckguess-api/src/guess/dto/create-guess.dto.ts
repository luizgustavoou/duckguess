import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateGuessDto {
  @IsNotEmpty()
  @MaxLength(12)
  answer: string;

  @IsUUID()
  themeId: string;
}
