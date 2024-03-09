import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { GuessService } from 'src/guess/services/guess.service';
import { HintService } from '../hint.service';
import { CreateHintDto } from 'src/hint/dto/create-hint.dto';
import { Hint } from 'src/hint/entities/hint.entity';
import { UpdateHintDto } from 'src/hint/dto/update-hint.dto';

export class HintServiceImpl implements HintService {
  constructor(
    @InjectRepository(Hint) private clueRepository: Repository<Hint>,
    private readonly guessService: GuessService,
  ) {}

  async create(createHintDto: CreateHintDto): Promise<Hint> {
    const { text, guessId } = createHintDto;

    const guess = await this.guessService.findOne(guessId);

    if (!guess) {
      throw new NotFoundException('Adivinhação não encontrada.');
    }

    if (guess.hints.length >= 3) {
      throw new ConflictException('Já existem 3 dicas para essa adivinhação.');
    }

    const clue = await this.clueRepository.save({ text, guess });

    return clue;
  }

  async findAll(): Promise<Hint[]> {
    const cluees = await this.clueRepository.find();

    return cluees;
  }

  async findOne(id: string): Promise<Hint> {
    const cluees = await this.clueRepository.findOneBy({ id });

    return cluees;
  }

  async update(id: string, updateHintDto: UpdateHintDto): Promise<Hint> {
    const clue = await this.clueRepository.findOneBy({ id });

    if (!clue) {
      throw new NotFoundException('Adivinhação não encontrado.');
    }

    await this.clueRepository.merge(clue, updateHintDto);

    const clueUpdated = await this.clueRepository.save(clue);

    return clueUpdated;
  }

  async remove(id: string): Promise<void> {
    await this.clueRepository.delete({ id });
  }
}
