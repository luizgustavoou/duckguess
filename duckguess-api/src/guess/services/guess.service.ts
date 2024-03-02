import { CreateGuessDto } from '../dto/create-guess.dto';
import { UpdateGuessDto } from '../dto/update-guess.dto';

export abstract class GuessService {
  abstract create(createGuessDto: CreateGuessDto);

  abstract findAll();

  abstract findOne(id: string);

  abstract update(id: string, updateGuessDto: UpdateGuessDto);

  abstract remove(id: string);
}
