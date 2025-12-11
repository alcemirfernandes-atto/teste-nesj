import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class DashboardRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Produto)
    private readonly produtoRepo: Repository<Produto>,
  ) {}

  async countUsers(): Promise<number> {
    return this.userRepo.count();
  }

  async countProdutos(): Promise<number> {
    return this.produtoRepo.count();
  }

  async countEstoque(): Promise<number> {
    const estoque = await this.produtoRepo.sum('estoque');
    if (!estoque) {
      return 0;
    }
    return estoque;
  }
}
