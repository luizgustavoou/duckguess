import { InjectRepository } from '@nestjs/typeorm';
import { Hint } from './entities/hint.entity';
import { Repository } from 'typeorm';
import { CreateHintDto } from './dto/create-hint.dto';
import { UpdateHintDto } from './dto/update-hint.dto';
import { Injectable } from '@nestjs/common';

export abstract class HintRepository {
  abstract create(createHintDto: CreateHintDto): Promise<Hint>;

  abstract findAll(): Promise<Hint[]>;

  abstract findOne(id: string): Promise<Hint>;

  abstract update(id: string, updateHintDto: UpdateHintDto): Promise<Hint>;

  abstract remove(id: string): Promise<void>;
}

@Injectable()
export class HintRepositoryImpl implements HintRepository {
  constructor(@InjectRepository(Hint) private repository: Repository<Hint>) {}

  async create(createHintDto: CreateHintDto): Promise<Hint> {
    const { text, guessId } = createHintDto;

    const hint = await this.repository.save({ text, guess: { id: guessId } });

    return hint;
  }

  async findAll(): Promise<Hint[]> {
    const hints = await this.repository.find();

    return hints;
  }

  async findOne(id: string): Promise<Hint> {
    const hints = await this.repository.findOne({
      where: {
        id,
      },
    });

    return hints;
  }

  async update(id: string, updateHintDto: UpdateHintDto): Promise<Hint> {
    const hint = await this.repository.findOneBy({ id });

    if (!hint) {
      //   throw new NotFoundException('Adivinhação não encontrado.');
    }

    await this.repository.merge(hint, updateHintDto);

    const hintUpdated = await this.repository.save(hint);

    return hintUpdated;
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}
