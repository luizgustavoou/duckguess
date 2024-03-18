import { Hint } from 'src/hint/entities/hint.entity';
import { Theme } from 'src/theme/entities/theme.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @OneToMany(() => Hint, (hint) => hint.guess)
  hints: Hint[];

  @ManyToOne(() => Theme, { nullable: false,  })
  theme: Theme;
}
