import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { ThemeRepository } from './theme.repository';
import { Theme } from './domain/theme';
import { ThemeMapper } from './mappers/theme.mapper';

@Injectable()
export class ThemeRepositoryTypeORM implements ThemeRepository {
  constructor(
    @InjectRepository(ThemeEntity)
    private readonly typeOrmRepository: Repository<ThemeEntity>,
  ) {}

  async save(theme: Partial<Theme>): Promise<Theme> {
    const entity = await this.typeOrmRepository.save(
      ThemeMapper.toEntity(theme),
    );
    return ThemeMapper.toDomain(entity);
  }

  async findAll(): Promise<Theme[]> {
    const entities = await this.typeOrmRepository.find();
    return entities.map(ThemeMapper.toDomain);
  }

  async findOne(id: string): Promise<Theme | null> {
    const entity = await this.typeOrmRepository.findOne({ where: { id } });
    return entity ? ThemeMapper.toDomain(entity) : null;
  }

  async findByValue(value: string): Promise<Theme | null> {
    const entity = await this.typeOrmRepository.findOne({ where: { value } });
    return entity ? ThemeMapper.toDomain(entity) : null;
  }

  async remove(id: string): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }

  async findRandom(): Promise<Theme | null> {
    const entity = await this.typeOrmRepository
      .createQueryBuilder('theme')
      .orderBy('RAND()')
      .getOne();
    return entity ? ThemeMapper.toDomain(entity) : null;
  }
}
