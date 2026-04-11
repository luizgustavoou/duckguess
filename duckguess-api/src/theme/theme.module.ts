import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { ThemeService, ThemeServiceImpl } from './theme.service';
import { ThemeRepository } from './theme.repository';
import { ThemeRepositoryTypeORM } from './theme.repository.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
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
  ],
  exports: [ThemeService, ThemeRepository],
})
export class ThemeModule {}
