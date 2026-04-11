import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from './entities/theme.entity';
import { ThemeRepository } from './theme.repository';

@Injectable()
export class ThemeRepositoryTypeORM implements ThemeRepository {
  constructor(
    @InjectRepository(Theme)
    private readonly typeOrmRepository: Repository<Theme>,
  ) {}

  async create(theme: Partial<Theme>): Promise<Theme> {
    const newTheme = this.typeOrmRepository.create(theme);
    return this.typeOrmRepository.save(newTheme);
  }

  async findAll(): Promise<Theme[]> {
    return this.typeOrmRepository.find();
  }

  async findOne(id: string): Promise<Theme | null> {
    return this.typeOrmRepository.findOne({ where: { id } });
  }

  async update(id: string, theme: Partial<Theme>): Promise<Theme | null> {
    await this.typeOrmRepository.update(id, theme);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }

  async findRandom(): Promise<Theme | null> {
    return this.typeOrmRepository
      .createQueryBuilder('theme')
      .orderBy('RAND()')
      .getOne();
  }
}
