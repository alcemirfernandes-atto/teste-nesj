import { Injectable, NotImplementedException } from '@nestjs/common';
import { ItemVenda } from '../entities/item.entity';
import { IRepository } from '../../../@shared/repositories/repository.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemRepository implements IRepository<ItemVenda> {
  constructor(
    @InjectRepository(ItemVenda) private readonly repo: Repository<ItemVenda>,
  ) {}

  async create(data: Partial<ItemVenda>): Promise<ItemVenda> {
    const item = this.repo.create(data);
    await this.repo.save(item);
    return item;
  }

  async update(id: string, data: Partial<ItemVenda>): Promise<void> {
    await this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  findAll(): Promise<ItemVenda[]> {
    throw new NotImplementedException();
  }

  async findByVendaId(id: string): Promise<ItemVenda[]> {
    return await this.repo.find({
      where: { id },
    });
  }

  async findById(id: string): Promise<ItemVenda | null> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) return null;
    return item;
  }
}
