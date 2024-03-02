import { CreateGuessDto } from "../dto/create-guess.dto";
import { UpdateGuessDto } from "../dto/update-guess.dto";

export interface IGuessRepository {
  create(createGuessDto: CreateGuessDto);

  findAll();

  findOne(id: number);

  update(id: number, updateGuessDto: UpdateGuessDto);

  remove(id: number);
}
