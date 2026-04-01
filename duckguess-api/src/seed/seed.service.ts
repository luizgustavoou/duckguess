import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { seedMocks } from './mock/guess-mock';
import { Theme } from '../theme/entities/theme.entity';
import { Guess } from '../guess/entities/guess.entity';
import { Hint } from '../hint/entities/hint.entity';
import { User } from '../user/entities/user.entity';
import { UserRole } from '../user/enums/user-role';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Theme) private readonly themeRepository: Repository<Theme>,
    @InjectRepository(Guess) private readonly guessRepository: Repository<Guess>,
    @InjectRepository(Hint) private readonly hintRepository: Repository<Hint>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  private async seed() {
    this.logger.log('Iniciando o db seed...');
    
    // Seed Admin User
    const adminEmail = 'luizgustavooumbelino@gmail.com';
    const existingAdmin = await this.userRepository.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const adminUser = this.userRepository.create({
        email: adminEmail,
        password: '123123',
        role: UserRole.ADMIN,
      });
      await this.userRepository.save(adminUser);
      this.logger.log('Admin user inserido no seed.');
    } else {
      this.logger.log('Admin user já existe.');
    }

    // Verifica se já existem Guesses no banco para não duplicar
    const guessCount = await this.guessRepository.count();
    if (guessCount > 0) {
      this.logger.log(`Banco já populado com ${guessCount} guess(es). Seed ignorado.`);
      return;
    }

    // Inserir os mocks para cada categoria de temas
    for (const group of seedMocks) {
      // Cria ou busca o Tema
      let currentTheme = await this.themeRepository.findOne({ where: { value: group.themeName } });
      if (!currentTheme) {
        currentTheme = this.themeRepository.create({ value: group.themeName });
        await this.themeRepository.save(currentTheme);
        this.logger.log(`Tema "${currentTheme.value}" criado no seed.`);
      }

      for (const mockItem of group.guesses) {
        // Cria a Guess associada ao tema
        const guess = this.guessRepository.create({
          answer: mockItem.answer,
          theme: currentTheme,
        });
        await this.guessRepository.save(guess);

        // Cria e insere as Hints correspondentes
        const hintsToSave = mockItem.hints.map((h) => 
          this.hintRepository.create({
            text: h.text,
            guess: guess,
          })
        );
        
        await this.hintRepository.save(hintsToSave);
        this.logger.log(`  - Inserido guess "${guess.answer}" (${currentTheme.value}).`);
      }
    }

    this.logger.log('Database seeded successfully.');
  }
}
