import { IsOptional, IsString } from 'class-validator';
import { IPaginationDto } from './IPaginationDto';

export class QueryGuessDto extends IPaginationDto {
  @IsString()
  @IsOptional()
  themeId?: string;
}
