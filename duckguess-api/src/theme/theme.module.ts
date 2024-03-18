import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { ThemeService } from './services/theme.service';
import { ThemeServiceImpl } from './services/impl/theme.impl.service';

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
