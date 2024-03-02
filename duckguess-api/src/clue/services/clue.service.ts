import { CreateClueDto } from '../dto/create-clue.dto';
import { UpdateClueDto } from '../dto/update-clue.dto';

export abstract class ClueService {
  abstract create(createGuessDto: CreateClueDto);

  abstract findAll();

  abstract findOne(id: string);

  abstract update(id: string, updateGuessDto: UpdateClueDto);

  abstract remove(id: string);
}
