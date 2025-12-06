import { Injectable } from '@nestjs/common';
import { IRepository } from '../../../@shared/repositories/repository.interface';
import { Produto } from '../entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoRepository implements IRepository<Produto> {
  constructor(
    @InjectRepository(Produto) private readonly repo: Repository<Produto>,
  ) {}

  async create(data: Partial<Produto>): Promise<void> {
    const produto = this.repo.create(data);
    await this.repo.save(produto);
  }

  async update(id: string, data: Partial<Produto>): Promise<void> {
    await this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findAll(): Promise<Produto[]> {
    return await this.repo.find();
  }

  async findById(id: string): Promise<Produto | null> {
    return await this.repo.findOne({ where: { id } });
  }
}
