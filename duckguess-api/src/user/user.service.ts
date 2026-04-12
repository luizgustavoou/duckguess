import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/domain/user';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserRepository } from './user.repository';

export abstract class UserService {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOneById(id: string): Promise<User>;
  abstract findOneByEmail(email: string): Promise<User>;
  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  abstract remove(id: string): Promise<void>;
}

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOneByEmail(
      createUserDto.email,
    );

    if (existing) {
      throw new ConflictException(
        'Já existe um usuário cadastrado com este email.',
      );
    }

    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOneById(id: string): Promise<User> {
    return this.userRepository.findOneById(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existing = await this.userRepository.findOneById(id);

    if (!existing) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.userRepository.save({ id, ...updateUserDto });
  }

  async remove(id: string): Promise<void> {
    return this.userRepository.remove(id);
  }
}
