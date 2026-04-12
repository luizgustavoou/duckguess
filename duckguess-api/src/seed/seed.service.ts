import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { seedMocks } from './mock/guess-mock';
import { ThemeRepository } from '../theme/theme.repository';
import { GuessRepository } from '../guess/guess.repository';
import { HintRepository } from '../hint/hint.repository';
import { UserRepository } from '../user/user.repository';
import { UserRole } from '../user/enums/user-role';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly themeRepository: ThemeRepository,
    private readonly guessRepository: GuessRepository,
    private readonly hintRepository: HintRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  private async seed() {
    this.logger.log('Iniciando o db seed...');

    // Seed Admin User
    const adminEmail = 'luizgustavooumbelino@gmail.com';
    const existingAdmin = await this.userRepository.findOneByEmail(adminEmail);
    if (!existingAdmin) {
      await this.userRepository.save({
        email: adminEmail,
        password: '123123',
        role: UserRole.ADMIN,
      });
      this.logger.log('Admin user inserido no seed.');
    } else {
      this.logger.log('Admin user já existe.');
    }

    // Verifica se já existem Guesses no banco para não duplicar
    const guessCount = await this.guessRepository.count();
    if (guessCount > 0) {
      this.logger.log(
        `Banco já populado com ${guessCount} guess(es). Seed ignorado.`,
      );
      return;
    }

    // Inserir os mocks para cada categoria de temas
    for (const group of seedMocks) {
      // Cria ou busca o Tema
      let currentTheme = await this.themeRepository.findByValue(
        group.themeName,
      );
      if (!currentTheme) {
        currentTheme = await this.themeRepository.save({
          value: group.themeName,
        });
        this.logger.log(`Tema "${currentTheme.value}" criado no seed.`);
      }

      for (const mockItem of group.guesses) {
        // Cria a Guess associada ao tema
        const guess = await this.guessRepository.save({
          answer: mockItem.answer,
          themeId: currentTheme.id,
        });

        // Cria as Hints correspondentes
        for (const h of mockItem.hints) {
          await this.hintRepository.save({ text: h.text, guessId: guess.id });
        }

        this.logger.log(
          `  - Inserido guess "${guess.answer}" (${currentTheme.value}).`,
        );
      }
    }

    this.logger.log('Database seeded successfully.');
  }
}
