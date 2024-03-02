import { PartialType } from '@nestjs/mapped-types';
import { CreateGuessDto } from './create-guess.dto';

export class UpdateGuessDto extends PartialType(CreateGuessDto) {}
