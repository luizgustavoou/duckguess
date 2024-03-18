import { CreateThemeDto } from '../dto/create-theme.dto';
import { UpdateThemeDto } from '../dto/update-theme.dto';
import { Theme } from '../entities/theme.entity';

export abstract class ThemeService {
  abstract create(createThemeDto: CreateThemeDto): Promise<Theme>;

  abstract findAll(): Promise<Theme[]>;

  abstract findOne(id: string): Promise<Theme>;

  abstract update(id: string, updateThemeDto: UpdateThemeDto): Promise<Theme>;

  abstract remove(id: string): Promise<void>;
}
