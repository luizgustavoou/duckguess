import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuessModule } from './guess/guess.module';
import { ClueModule } from './clue/clue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'banco123',
      database: 'db-duckguess',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    GuessModule,
    ClueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
