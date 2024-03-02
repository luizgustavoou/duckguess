import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGuessDto {
  @IsNotEmpty()
  answer: string;
}
