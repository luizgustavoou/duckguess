import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export abstract class UserService {
  abstract create(createHintDto: CreateUserDto): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract findOne(id: string): Promise<User>;

  abstract update(id: string, updateHintDto: UpdateUserDto): Promise<User>;

  abstract remove(id: string): Promise<void>;
}
