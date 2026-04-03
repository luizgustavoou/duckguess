import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuessDto } from './dto/create-guess.dto';
import { UpdateGuessDto } from './dto/update-guess.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guess } from 'src/guess/entities/guess.entity';
import { Repository } from 'typeorm';
import { QueryGuessDto } from 'src/guess/dto/query-guess.dto';
import { ThemeService } from 'src/theme/theme.service';

export abstract class GuessService {
  abstract create(createGuessDto: CreateGuessDto): Promise<Guess>;

  abstract findAll(queryGuessDto: QueryGuessDto): Promise<Guess[]>;

  abstract findOne(id: string): Promise<Guess>;

  abstract update(id: string, updateGuessDto: UpdateGuessDto): Promise<Guess>;

  abstract remove(id: string): Promise<void>;
}
@Injectable()
export class GuessServiceImpl implements GuessService {
  constructor(
    @InjectRepository(Guess) private guessRepository: Repository<Guess>,
    private themeService: ThemeService,
  ) {}

  async create(createGuessDto: CreateGuessDto): Promise<Guess> {
    const { answer, themeId, hints } = createGuessDto;

    const theme = await this.themeService.findOne(themeId);

    if (!theme) {
      throw new NotFoundException('Tema não encontrado.');
    }

    const guess = await this.guessRepository.save({
      answer,
      theme,
      hints: hints || [],
    });

    return guess;
  }

  async findAll(queryGuessDto: QueryGuessDto): Promise<Guess[]> {
    const { skip, take, themeId } = queryGuessDto;

    const where: any = {};

    if (themeId) {
      where.theme = { id: themeId };
    }

    const [guesses, count] = await this.guessRepository.findAndCount({
      where,
      skip,
      take,
      relations: {
        hints: true,
        theme: true,
      },
    });

    return guesses;
  }


  async findOne(id: string): Promise<Guess> {
    const guesses = await this.guessRepository.findOne({
      where: { id },
      relations: { 
        hints: true, 
        theme: true 
      },
    });

    return guesses;
  }

  async update(id: string, updateGuessDto: UpdateGuessDto): Promise<Guess> {
    const guess = await this.guessRepository.findOneBy({ id });

    if (!guess) {
      throw new NotFoundException('Adivinhação não encontrada.');
    }

    const { themeId, ...updateData } = updateGuessDto;

    if (themeId) {
      const theme = await this.themeService.findOne(themeId);
      if (!theme) {
        throw new NotFoundException('Tema não encontrado.');
      }
      guess.theme = theme;
    }

    await this.guessRepository.merge(guess, updateData);

    const guessUpdated = await this.guessRepository.save(guess);

    return guessUpdated;
  }

  async remove(id: string): Promise<void> {
    await this.guessRepository.delete({ id });
  }
}
