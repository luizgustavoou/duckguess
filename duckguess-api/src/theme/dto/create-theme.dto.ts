import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateThemeDto {
  @IsNotEmpty()
  @MaxLength(12)
  value: string;
}
