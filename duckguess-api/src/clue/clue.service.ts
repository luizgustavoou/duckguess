import { Injectable } from '@nestjs/common';
import { CreateClueDto } from './dto/create-clue.dto';
import { UpdateClueDto } from './dto/update-clue.dto';

@Injectable()
export class ClueService {
  create(createClueDto: CreateClueDto) {
    return 'This action adds a new clue';
  }

  findAll() {
    return `This action returns all clue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clue`;
  }

  update(id: number, updateClueDto: UpdateClueDto) {
    return `This action updates a #${id} clue`;
  }

  remove(id: number) {
    return `This action removes a #${id} clue`;
  }
}
