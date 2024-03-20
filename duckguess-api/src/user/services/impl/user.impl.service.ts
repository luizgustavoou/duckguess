import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserService } from '../user.service';

export class UserServiceImpl implements UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, roleUser } = createUserDto;

    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new ConflictException(
        'Já existe um usuário cadastrado com este email.',
      );
    }

    const newUser = await this.userRepository.save({
      email,
      password,
      roleUser,
    });

    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    await this.userRepository.merge(user, updateUserDto);

    const clueUpdated = await this.userRepository.save(user);

    return clueUpdated;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
