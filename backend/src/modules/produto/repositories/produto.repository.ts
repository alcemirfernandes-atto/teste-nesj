import { Injectable } from '@nestjs/common';
import { IRepository } from '../../../@shared/repositories/repository.interface';
import { Produto } from '../entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

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

  async findByName(name: string, take = 20): Promise<Produto[] | null> {
    return this.repo.find({
      where: {
        name: Like(`%${name}%`),
      },
      take,
    });
  }

  async findAll(): Promise<Produto[]> {
    return await this.repo.find();
  }

  async findById(id: string): Promise<Produto | null> {
    return await this.repo.findOne({ where: { id } });
  }
}
