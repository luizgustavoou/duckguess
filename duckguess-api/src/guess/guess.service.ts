import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuessDto } from './dto/create-guess.dto';
import { UpdateGuessDto } from './dto/update-guess.dto';
import { QueryGuessDto } from 'src/guess/dto/query-guess.dto';
import { Guess } from 'src/guess/domain/guess';
import { GuessRepository } from './guess.repository';
import { ThemeRepository } from 'src/theme/theme.repository';

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
    private readonly guessRepository: GuessRepository,
    private readonly themeRepository: ThemeRepository,
  ) {}

  async create(createGuessDto: CreateGuessDto): Promise<Guess> {
    const { answer, themeId, hints } = createGuessDto;

    const theme = await this.themeRepository.findOne(themeId);
    if (!theme) {
      throw new NotFoundException('Tema não encontrado.');
    }

    return this.guessRepository.save({ answer, themeId, hints: hints as any });
  }

  async findAll(queryGuessDto: QueryGuessDto): Promise<Guess[]> {
    const { themeId } = queryGuessDto;

    if (themeId) {
      return this.guessRepository.findByTheme(themeId);
    }

    return this.guessRepository.findAll();
  }

  async findOne(id: string): Promise<Guess> {
    const guess = await this.guessRepository.findOne(id);

    if (!guess) {
      throw new NotFoundException('Adivinhação não encontrada.');
    }

    return guess;
  }

  async update(id: string, updateGuessDto: UpdateGuessDto): Promise<Guess> {
    const existing = await this.guessRepository.findOne(id);

    if (!existing) {
      throw new NotFoundException('Adivinhação não encontrada.');
    }

    const updates: Partial<Guess> = { id };

    if (updateGuessDto.answer !== undefined) {
      updates.answer = updateGuessDto.answer;
    }

    if (updateGuessDto.themeId) {
      const theme = await this.themeRepository.findOne(updateGuessDto.themeId);
      if (!theme) {
        throw new NotFoundException('Tema não encontrado.');
      }
      updates.themeId = updateGuessDto.themeId;
    }

    return this.guessRepository.save(updates);
  }

  async remove(id: string): Promise<void> {
    await this.guessRepository.remove(id);
  }
}
