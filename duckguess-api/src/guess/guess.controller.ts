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
import { IPaginationDto } from './dto/IPaginationDto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/user/enums/user-role';
import { GuessService } from './guess.service';

@Controller('guess')
export class GuessController {
  constructor(private readonly guessService: GuessService) {}

  @Roles([UserRole.ADMIN])
  @Post()
  create(@Body() createGuessDto: CreateGuessDto) {
    return this.guessService.create(createGuessDto);
  }

  @Public()
  @Get()
  findAll(@Query() paginationDto: IPaginationDto) {
    return this.guessService.findAll(paginationDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.guessService.findOne(id);
  }

  @Roles([UserRole.ADMIN])
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGuessDto: UpdateGuessDto,
  ) {
    return this.guessService.update(id, updateGuessDto);
  }

  @Roles([UserRole.ADMIN])
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.guessService.remove(id);
  }
}
