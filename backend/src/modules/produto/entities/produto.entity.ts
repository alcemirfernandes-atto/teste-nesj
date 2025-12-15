import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  codBa: string;

  @Column()
  preco: number;

  @Column()
  estoque: number;
}
