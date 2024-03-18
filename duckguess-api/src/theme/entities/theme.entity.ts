import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Theme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;
}
