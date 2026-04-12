import { GuessEntity } from 'src/guess/entities/guess.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class ThemeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @OneToMany(() => GuessEntity, (guess) => guess.theme)
  guesses: GuessEntity[];
}
