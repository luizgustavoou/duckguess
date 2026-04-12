import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHintDto } from 'src/hint/dto/create-hint.dto';
import { UpdateHintDto } from 'src/hint/dto/update-hint.dto';
import { GuessService } from 'src/guess/guess.service';
import { HintRepository } from './hint.repository';
import { Hint } from './domain/hint';

export abstract class HintService {
  abstract create(createHintDto: CreateHintDto): Promise<Hint>;
  abstract findAll(): Promise<Hint[]>;
  abstract findOne(id: string): Promise<Hint>;
  abstract update(id: string, updateHintDto: UpdateHintDto): Promise<Hint>;
  abstract remove(id: string): Promise<void>;
}

@Injectable()
export class HintServiceImpl implements HintService {
  constructor(
    private readonly hintRepository: HintRepository,
    private readonly guessService: GuessService,
  ) {}

  async create(createHintDto: CreateHintDto): Promise<Hint> {
    const { text, guessId } = createHintDto;

    const guess = await this.guessService.findOne(guessId);

    if (!guess) {
      throw new NotFoundException('Adivinhação não encontrada.');
    }

    if (guess.hints.length >= 10) {
      throw new ConflictException('Já existem 10 dicas para essa adivinhação.');
    }

    return this.hintRepository.save({ text, guessId });
  }

  async findAll(): Promise<Hint[]> {
    return this.hintRepository.findAll();
  }

  async findOne(id: string): Promise<Hint> {
    return this.hintRepository.findOne(id);
  }

  async update(id: string, updateHintDto: UpdateHintDto): Promise<Hint> {
    const existing = await this.hintRepository.findOne(id);

    if (!existing) {
      throw new NotFoundException('Dica não encontrada.');
    }

    return this.hintRepository.save({ id, text: updateHintDto.text });
  }

  async remove(id: string): Promise<void> {
    return this.hintRepository.remove(id);
  }
}
