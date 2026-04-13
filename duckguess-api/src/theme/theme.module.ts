import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { ThemeService, ThemeServiceImpl } from './theme.service';
import { ThemeRepository } from './theme.repository';
import { ThemeRepositoryTypeORM } from './theme.repository.typeorm';
import { ThemeQueryRepository } from './theme-query.repository';
import { ThemeRepositoryTypeORMQuery } from './theme.repository.typeorm.query';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeEntity])],
  controllers: [ThemeController],
  providers: [
    {
      provide: ThemeService,
      useClass: ThemeServiceImpl,
    },
    {
      provide: ThemeRepository,
      useClass: ThemeRepositoryTypeORM,
    },
    {
      provide: ThemeQueryRepository,
      useClass: ThemeRepositoryTypeORMQuery,
    },
  ],
  exports: [ThemeService, ThemeRepository, ThemeQueryRepository],
})
export class ThemeModule { }
