import { Injectable, NotFoundException } from '@nestjs/common';
import { Theme } from 'src/theme/domain/theme';
import { CreateThemeDto } from 'src/theme/dto/create-theme.dto';
import { UpdateThemeDto } from 'src/theme/dto/update-theme.dto';
import { ThemeRepository } from './theme.repository';

export abstract class ThemeService {
  abstract create(createThemeDto: CreateThemeDto): Promise<Theme>;
  abstract findAll(): Promise<Theme[]>;
  abstract findOne(id: string): Promise<Theme>;
  abstract update(id: string, updateThemeDto: UpdateThemeDto): Promise<Theme>;
  abstract remove(id: string): Promise<void>;
}

@Injectable()
export class ThemeServiceImpl implements ThemeService {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async create(createThemeDto: CreateThemeDto): Promise<Theme> {
    return this.themeRepository.save({ value: createThemeDto.value });
  }

  async findAll(): Promise<Theme[]> {
    return this.themeRepository.findAll();
  }

  async findOne(id: string): Promise<Theme> {
    const theme = await this.themeRepository.findOne(id);

    if (!theme) {
      throw new NotFoundException('Tema não encontrado.');
    }

    return theme;
  }

  async update(id: string, updateThemeDto: UpdateThemeDto): Promise<Theme> {
    const existing = await this.themeRepository.findOne(id);

    if (!existing) {
      throw new NotFoundException('Tema não encontrado.');
    }

    return this.themeRepository.save({ id, ...updateThemeDto });
  }

  async remove(id: string): Promise<void> {
    await this.themeRepository.remove(id);
  }
}
