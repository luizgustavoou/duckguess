import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Theme } from 'src/theme/entities/theme.entity';
import { CreateThemeDto } from 'src/theme/dto/create-theme.dto';
import { ThemeService } from '../theme.service';
import { UpdateThemeDto } from 'src/theme/dto/update-theme.dto';

export class ThemeServiceImpl implements ThemeService {
  constructor(
    @InjectRepository(Theme) private themeRepository: Repository<Theme>,
  ) {}

  async create(createThemeDto: CreateThemeDto): Promise<Theme> {
    const { value } = createThemeDto;

    const theme = await this.themeRepository.save({ value });

    return theme;
  }

  async findAll(): Promise<Theme[]> {
    const themes = await this.themeRepository.find();

    return themes;
  }

  async findOne(id: string): Promise<Theme> {
    const themes = await this.themeRepository.findOneBy({ id });

    return themes;
  }

  async update(id: string, updateThemeDto: UpdateThemeDto): Promise<Theme> {
    const theme = await this.themeRepository.findOneBy({ id });

    if (!theme) {
      throw new NotFoundException('Tema não encontrado.');
    }

    await this.themeRepository.merge(theme, updateThemeDto);

    const themeUpdated = await this.themeRepository.save(theme);

    return themeUpdated;
  }

  async remove(id: string): Promise<void> {
    await this.themeRepository.delete({ id });
  }
}
