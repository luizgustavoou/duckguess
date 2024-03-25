import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHintDto } from 'src/hint/dto/create-hint.dto';
import { Hint } from 'src/hint/entities/hint.entity';
import { UpdateHintDto } from 'src/hint/dto/update-hint.dto';
import { GuessService } from 'src/guess/guess.service';
import { HintRepository } from './hint.repository';

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
    private readonly repository: HintRepository,
    // @InjectRepository(Hint) private repository: Repository<Hint>,
    private readonly guessService: GuessService,
  ) {
    console.log({ repository });
  }

  async create(createHintDto: CreateHintDto): Promise<Hint> {
    const { text, guessId } = createHintDto;

    const guess = await this.guessService.findOne(guessId);

    if (!guess) {
      throw new NotFoundException('Adivinhação não encontrada.');
    }

    if (guess.hints.length >= 3) {
      throw new ConflictException('Já existem 3 dicas para essa adivinhação.');
    }

    const hint = await this.repository.create({ text, guessId });

    return hint;
  }

  async findAll(): Promise<Hint[]> {
    const hints = await this.repository.findAll();

    return hints;
  }

  async findOne(id: string): Promise<Hint> {
    const hints = await this.repository.findOne(id);

    return hints;
  }

  async update(id: string, updateHintDto: UpdateHintDto): Promise<Hint> {
    const hintUpdated = await this.repository.update(id, updateHintDto);

    return hintUpdated;
  }

  async remove(id: string): Promise<void> {
    await this.repository.remove(id);
  }
}
