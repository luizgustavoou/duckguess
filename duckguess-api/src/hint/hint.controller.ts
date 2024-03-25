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
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/user/enums/user-role';
import { HintService } from './hint.service';

@Controller('hint')
export class HintController {
  constructor(private readonly hintService: HintService) {}

  @Roles([UserRole.ADMIN])
  @Post()
  create(@Body() createGuessDto: CreateHintDto) {
    return this.hintService.create(createGuessDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.hintService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.hintService.findOne(id);
  }

  @Roles([UserRole.ADMIN])
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateHintDto: UpdateHintDto,
  ) {
    return this.hintService.update(id, updateHintDto);
  }

  @Roles([UserRole.ADMIN])
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.hintService.remove(id);
  }
}
