import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item_venda')
export class ItemVenda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  idProduto: string;

  @Column()
  idVenda: string;

  @Column()
  qtd: number;

  @Column()
  desconto: number;
}
