import { IsNotEmpty } from 'class-validator';

export class CreateClueDto {
  @IsNotEmpty()
  hint: string;
}
