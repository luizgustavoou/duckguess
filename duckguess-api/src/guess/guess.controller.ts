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
import { CreateGuessDto } from './dto/create-guess.dto';
import { UpdateGuessDto } from './dto/update-guess.dto';
import { GuessService } from './services/guess.service';

@Controller('guess')
export class GuessController {
  constructor(private readonly guessService: GuessService) {}

  @Post()
  create(@Body() createGuessDto: CreateGuessDto) {
    return this.guessService.create(createGuessDto);
  }

  @Get()
  findAll() {
    return this.guessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.guessService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGuessDto: UpdateGuessDto,
  ) {
    return this.guessService.update(id, updateGuessDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.guessService.remove(id);
  }
}
