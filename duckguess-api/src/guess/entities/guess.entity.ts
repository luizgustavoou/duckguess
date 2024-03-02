import { Clue } from 'src/clue/entities/clue.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Hint,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Guess {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answer: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Clue, (clue) => clue.guess)
  hints: Hint[];
}
