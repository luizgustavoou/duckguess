import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ThemeService } from './services/theme.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Post()
  create(@Body() createThemeDto: CreateThemeDto) {
    return this.themeService.create(createThemeDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.themeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.themeService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateThemeDto: UpdateThemeDto,
  ) {
    return this.themeService.update(id, updateThemeDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.themeService.remove(id);
  }
}
