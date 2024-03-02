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
import { CreateClueDto } from './dto/create-clue.dto';
import { UpdateClueDto } from './dto/update-clue.dto';
import { ClueService } from './services/clue.service';

@Controller('clue')
export class ClueController {
  constructor(private readonly clueService: ClueService) {}

  @Post()
  create(@Body() createGuessDto: CreateClueDto) {
    return this.clueService.create(createGuessDto);
  }

  @Get()
  findAll() {
    return this.clueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clueService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGuessDto: UpdateClueDto,
  ) {
    return this.clueService.update(id, updateGuessDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clueService.remove(id);
  }
}
