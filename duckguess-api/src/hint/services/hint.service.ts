import { Hint } from 'typeorm';
import { CreateHintDto } from '../dto/create-hint.dto';
import { UpdateHintDto } from '../dto/update-hint.dto';

export abstract class HintService {
  abstract create(createHintDto: CreateHintDto): Promise<Hint>;

  abstract findAll(): Promise<Hint[]>;

  abstract findOne(id: string): Promise<Hint>;

  abstract update(id: string, updateHintDto: UpdateHintDto): Promise<Hint>;

  abstract remove(id: string): Promise<void>;
}
