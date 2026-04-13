import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { ThemeQueryRepository } from './theme-query.repository';
import { IThemeDto } from './application/theme.dto';

@Injectable()
export class ThemeRepositoryTypeORMQuery implements ThemeQueryRepository {
  constructor(
    @InjectRepository(ThemeEntity)
    private readonly typeOrmRepository: Repository<IThemeDto>,
  ) { }

  async findAllWithGuesses(): Promise<IThemeDto[]> {
    return this.typeOrmRepository.find({
      relations: ['guesses', 'guesses.hints'],
    });
  }
}
