import { Injectable } from '@nestjs/common';
import { CreateGuessDto } from '../../dto/create-guess.dto';
import { UpdateGuessDto } from '../../dto/update-guess.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guess } from 'src/guess/entities/guess.entity';
import { Repository } from 'typeorm';
import { GuessService } from '../guess.service';

@Injectable()
export class GuessServiceImpl implements GuessService {
  constructor(
    @InjectRepository(Guess) private guessRepository: Repository<Guess>,
  ) {}

  create(createGuessDto: CreateGuessDto) {
    return 'This action adds a new guess';
  }

  findAll() {
    return `This action returns all guess`;
  }

  findOne(id: string) {
    return `This action returns a #${id} guess`;
  }

  update(id: string, updateGuessDto: UpdateGuessDto) {
    return `This action updates a #${id} guess`;
  }

  remove(id: string) {
    return `This action removes a #${id} guess`;
  }
}
