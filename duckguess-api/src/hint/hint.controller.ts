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

import { CreateHintDto } from './dto/create-hint.dto';
import { UpdateHintDto } from './dto/update-hint.dto';
import { HintService } from './services/hint.service';

@Controller('hint')
export class HintController {
  constructor(private readonly hintService: HintService) {}

  @Post()
  create(@Body() createGuessDto: CreateHintDto) {
    return this.hintService.create(createGuessDto);
  }

  @Get()
  findAll() {
    return this.hintService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.hintService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateHintDto: UpdateHintDto,
  ) {
    return this.hintService.update(id, updateHintDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.hintService.remove(id);
  }
}
