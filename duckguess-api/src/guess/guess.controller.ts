import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CreateGuessDto } from './dto/create-guess.dto';
import { UpdateGuessDto } from './dto/update-guess.dto';
import { GuessService } from './services/guess.service';
import { IPaginationDto } from './dto/IPaginationDto';
import { Public } from 'src/decorators/public.decorator';

@Controller('guess')
export class GuessController {
  constructor(private readonly guessService: GuessService) {}

  @Post()
  create(@Body() createGuessDto: CreateGuessDto) {
    return this.guessService.create(createGuessDto);
  }

  @Public()
  @Get()
  findAll(@Query() paginationDto: IPaginationDto) {
    return this.guessService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.guessService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGuessDto: UpdateGuessDto,
  ) {
    return this.guessService.update(id, updateGuessDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.guessService.remove(id);
  }
}
