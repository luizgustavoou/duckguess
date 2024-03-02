import { Guess } from 'src/guess/entities/guess.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Clue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hint: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Guess, (guess) => guess.hints)
  guess: Guess;
}
