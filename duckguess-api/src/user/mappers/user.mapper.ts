import { User } from '../domain/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    const domain = new User();
    domain.id = entity.id;
    domain.email = entity.email;
    domain.password = entity.password;
    domain.role = entity.role;
    return domain;
  }

  static toEntity(domain: Partial<User>): Partial<UserEntity> {
    const entity: Partial<UserEntity> = {};
    if (domain.id !== undefined) entity.id = domain.id;
    if (domain.email !== undefined) entity.email = domain.email;
    if (domain.password !== undefined) entity.password = domain.password;
    if (domain.role !== undefined) entity.role = domain.role;
    return entity;
  }
}
