import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('venda')
export class Venda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nVenda: number;

  @Column()
  nomeCliente: string;
}
