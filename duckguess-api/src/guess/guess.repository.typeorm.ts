import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuessEntity } from './entities/guess.entity';
import { GuessRepository } from './guess.repository';
import { Guess } from './domain/guess';
import { GuessMapper } from './mappers/guess.mapper';

@Injectable()
export class GuessRepositoryTypeORM implements GuessRepository {
  constructor(
    @InjectRepository(GuessEntity)
    private readonly typeOrmRepository: Repository<GuessEntity>,
  ) {}

  async save(guess: Partial<Guess>): Promise<Guess> {
    const entity = await this.typeOrmRepository.save(
      GuessMapper.toEntity(guess),
    );
    // Reload with relations for the full domain object
    return this.findOne(entity.id);
  }

  async findAll(): Promise<Guess[]> {
    const entities = await this.typeOrmRepository.find({
      relations: ['hints', 'theme'],
    });
    return entities.map(GuessMapper.toDomain);
  }

  async findOne(id: string): Promise<Guess | null> {
    const entity = await this.typeOrmRepository.findOne({
      where: { id },
      relations: ['hints', 'theme'],
    });
    return entity ? GuessMapper.toDomain(entity) : null;
  }

  async findByTheme(themeId: string): Promise<Guess[]> {
    const entities = await this.typeOrmRepository.find({
      where: { theme: { id: themeId } },
      relations: ['hints', 'theme'],
    });
    return entities.map(GuessMapper.toDomain);
  }

  async count(): Promise<number> {
    return this.typeOrmRepository.count();
  }

  async remove(id: string): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }
}
