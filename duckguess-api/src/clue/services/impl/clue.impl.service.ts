import { CreateClueDto } from 'src/clue/dto/create-clue.dto';
import { UpdateClueDto } from 'src/clue/dto/update-clue.dto';
import { ClueService } from '../clue.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Clue } from 'src/clue/entities/clue.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class ClueServiceImpl implements ClueService {
  constructor(
    @InjectRepository(Clue) private clueRepository: Repository<Clue>,
  ) {}

  async create(createClueDto: CreateClueDto) {
    const { hint } = createClueDto;
    const clue = await this.clueRepository.save({ hint });

    return clue;
  }

  async findAll() {
    const cluees = await this.clueRepository.find();

    return cluees;
  }

  async findOne(id: string) {
    const cluees = await this.clueRepository.findOneBy({ id });

    return cluees;
  }

  async update(id: string, updateClueDto: UpdateClueDto) {
    const clue = await this.clueRepository.findOneBy({ id });

    if (!clue) {
      throw new NotFoundException('Adivinhação não encontrado.');
    }

    await this.clueRepository.merge(clue, updateClueDto);

    const clueUpdated = await this.clueRepository.save(clue);

    return clue;
  }

  async remove(id: string) {
    await this.clueRepository.delete({ id });
  }
}
