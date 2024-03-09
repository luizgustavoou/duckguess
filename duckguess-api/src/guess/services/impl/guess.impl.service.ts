import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createGuessDto: CreateGuessDto): Promise<Guess> {
    const { answer } = createGuessDto;
    const guess = await this.guessRepository.save({ answer });

    return guess;
  }

  async findAll(): Promise<Guess[]> {
    const guesses = await this.guessRepository.find({
      relations: {
        hints: true,
      },
    });

    return guesses;
  }

  async findOne(id: string): Promise<Guess> {
    const guesses = await this.guessRepository.findOne({
      where: { id },
      relations: { hints: true },
    });

    return guesses;
  }

  async update(id: string, updateGuessDto: UpdateGuessDto): Promise<Guess> {
    const guess = await this.guessRepository.findOneBy({ id });

    if (!guess) {
      throw new NotFoundException('Adivinhação não encontrada.');
    }

    await this.guessRepository.merge(guess, updateGuessDto);

    const guessUpdated = await this.guessRepository.save(guess);

    return guessUpdated;
  }

  async remove(id: string): Promise<void> {
    await this.guessRepository.delete({ id });
  }
}
