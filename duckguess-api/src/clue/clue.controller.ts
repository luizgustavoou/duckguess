import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClueService } from './clue.service';
import { CreateClueDto } from './dto/create-clue.dto';
import { UpdateClueDto } from './dto/update-clue.dto';

@Controller('clue')
export class ClueController {
  constructor(private readonly clueService: ClueService) {}

  @Post()
  create(@Body() createClueDto: CreateClueDto) {
    return this.clueService.create(createClueDto);
  }

  @Get()
  findAll() {
    return this.clueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClueDto: UpdateClueDto) {
    return this.clueService.update(+id, updateClueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clueService.remove(+id);
  }
}
