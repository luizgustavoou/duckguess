import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService, UserServiceImpl } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useClass: UserServiceImpl,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
