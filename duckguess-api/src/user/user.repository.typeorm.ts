import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { User } from './domain/user';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserRepositoryTypeORM implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmRepository: Repository<UserEntity>,
  ) {}

  async save(user: Partial<User>): Promise<User> {
    const entity = await this.typeOrmRepository.save(
      UserMapper.toEntity(user),
    );
    return UserMapper.toDomain(entity);
  }

  async findAll(): Promise<User[]> {
    const entities = await this.typeOrmRepository.find();
    return entities.map(UserMapper.toDomain);
  }

  async findOneById(id: string): Promise<User | null> {
    const entity = await this.typeOrmRepository.findOneBy({ id });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const entity = await this.typeOrmRepository.findOneBy({ email });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async remove(id: string): Promise<void> {
    await this.typeOrmRepository.delete({ id });
  }
}
