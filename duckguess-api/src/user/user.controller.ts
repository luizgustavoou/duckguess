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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { MatchService } from 'src/match/match.service';
import { CurrentUser, CurrentUserData } from 'src/decorators/current-user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from './enums/user-role';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly matchService: MatchService,
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile/me')
  getProfile(@CurrentUser() user: CurrentUserData) {
    return this.userService.findOneById(user.userId);
  }

  @Get('matches/me')
  getMyMatches(@CurrentUser() user: CurrentUserData) {
    return this.matchService.getMatchesForUser(user.userId);
  }

  @Get('matches')
  @Roles([UserRole.ADMIN])
  getAllMatches() {
    return this.matchService.getAllMatches();
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
