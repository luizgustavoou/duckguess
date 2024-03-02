import { CreateHintDto } from '../dto/create-hint.dto';
import { UpdateHintDto } from '../dto/update-hint.dto';

export abstract class HintService {
  abstract create(createHintDto: CreateHintDto);

  abstract findAll();

  abstract findOne(id: string);

  abstract update(id: string, updateHintDto: UpdateHintDto);

  abstract remove(id: string);
}
