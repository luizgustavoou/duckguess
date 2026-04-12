import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { ThemeQuery } from './theme.query';

@Injectable()
export class ThemeRepositoryTypeORMQuery implements ThemeQuery {
  constructor(
    @InjectRepository(ThemeEntity)
    private readonly typeOrmRepository: Repository<ThemeEntity>,
  ) {}

  async findAllWithGuesses(): Promise<ThemeEntity[]> {
    return this.typeOrmRepository.find({
      relations: ['guesses', 'guesses.hints'],
    });
  }
}
