import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  idade: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  senha: string;
}
