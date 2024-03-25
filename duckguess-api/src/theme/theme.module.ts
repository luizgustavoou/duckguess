import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { ThemeService, ThemeServiceImpl } from './theme.service';

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  controllers: [ThemeController],
  providers: [
    {
      provide: ThemeService,
      useClass: ThemeServiceImpl,
    },
  ],
  exports: [ThemeService],
})
export class ThemeModule {}
