import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HintEntity } from './entities/hint.entity';
import { HintRepository } from './hint.repository';
import { Hint } from './domain/hint';
import { HintMapper } from './mappers/hint.mapper';

@Injectable()
export class HintRepositoryTypeORM implements HintRepository {
  constructor(
    @InjectRepository(HintEntity)
    private readonly typeOrmRepository: Repository<HintEntity>,
  ) {}

  async save(hint: Partial<Hint>): Promise<Hint> {
    const entity = await this.typeOrmRepository.save(
      HintMapper.toEntity(hint),
    );
    // Reload to get full entity (including guess relation if needed)
    const reloaded = await this.typeOrmRepository.findOne({
      where: { id: entity.id },
      relations: ['guess'],
    });
    return HintMapper.toDomain(reloaded);
  }

  async findAll(): Promise<Hint[]> {
    const entities = await this.typeOrmRepository.find({
      relations: ['guess'],
    });
    return entities.map(HintMapper.toDomain);
  }

  async findOne(id: string): Promise<Hint | null> {
    const entity = await this.typeOrmRepository.findOne({
      where: { id },
      relations: ['guess'],
    });
    return entity ? HintMapper.toDomain(entity) : null;
  }

  async remove(id: string): Promise<void> {
    await this.typeOrmRepository.delete({ id });
  }
}
