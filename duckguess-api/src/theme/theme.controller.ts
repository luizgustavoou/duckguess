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
import { Public } from 'src/decorators/public.decorator';
import { UserRole } from 'src/user/enums/user-role';
import { Roles } from 'src/decorators/roles.decorator';
import { ThemeService } from './theme.service';

@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Roles([UserRole.ADMIN])
  @Post()
  create(@Body() createThemeDto: CreateThemeDto) {
    return this.themeService.create(createThemeDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.themeService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.themeService.findOne(id);
  }

  @Roles([UserRole.ADMIN])
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateThemeDto: UpdateThemeDto,
  ) {
    return this.themeService.update(id, updateThemeDto);
  }

  @Roles([UserRole.ADMIN])
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.themeService.remove(id);
  }
}
