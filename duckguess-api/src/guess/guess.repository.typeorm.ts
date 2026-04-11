import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guess } from './entities/guess.entity';
import { GuessRepository } from './guess.repository';

@Injectable()
export class GuessRepositoryTypeORM implements GuessRepository {
  constructor(
    @InjectRepository(Guess)
    private readonly typeOrmRepository: Repository<Guess>,
  ) {}

  async create(guess: Partial<Guess>): Promise<Guess> {
    const newGuess = this.typeOrmRepository.create(guess);
    return this.typeOrmRepository.save(newGuess);
  }

  async findAll(): Promise<Guess[]> {
    return this.typeOrmRepository.find({ relations: ['hints', 'theme'] });
  }

  async findOne(id: string): Promise<Guess | null> {
    return this.typeOrmRepository.findOne({ where: { id }, relations: ['hints', 'theme'] });
  }

  async update(id: string, guess: Partial<Guess>): Promise<Guess | null> {
    await this.typeOrmRepository.update(id, guess);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }

  async findByTheme(themeId: string): Promise<Guess[]> {
    return this.typeOrmRepository.find({
      where: { theme: { id: themeId } },
      relations: ['hints', 'theme'],
    });
  }
}
