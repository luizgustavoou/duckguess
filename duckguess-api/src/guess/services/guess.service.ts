import { CreateGuessDto } from '../dto/create-guess.dto';
import { UpdateGuessDto } from '../dto/update-guess.dto';
import { Guess } from '../entities/guess.entity';

export abstract class GuessService {
  abstract create(createGuessDto: CreateGuessDto): Promise<Guess>;

  abstract findAll(): Promise<Guess[]>;

  abstract findOne(id: string): Promise<Guess>;

  abstract update(id: string, updateGuessDto: UpdateGuessDto): Promise<Guess>;

  abstract remove(id: string): Promise<void>;
}
