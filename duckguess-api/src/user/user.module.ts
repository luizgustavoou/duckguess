import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService, UserServiceImpl } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserRepositoryTypeORM } from './user.repository.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryTypeORM,
    },
    {
      provide: UserService,
      useClass: UserServiceImpl,
    },
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
