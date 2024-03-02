import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuessModule } from './guess/guess.module';
import { HintModule } from './hint/hint.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '@%20Pato23%@',
      //password: 'banco123',
      //database: 'db-duckguess',
      database: 'db-duckguess',
      synchronize: true,
      autoLoadEntities: true,
    }),
    GuessModule,
    HintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
