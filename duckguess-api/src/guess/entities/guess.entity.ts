import { HintEntity } from 'src/hint/entities/hint.entity';
import { ThemeEntity } from 'src/theme/entities/theme.entity';
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
export class GuessEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answer: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => HintEntity, (hint) => hint.guess, { cascade: true })
  hints: HintEntity[];

  @ManyToOne(() => ThemeEntity, { nullable: false })
  theme: ThemeEntity;
}
