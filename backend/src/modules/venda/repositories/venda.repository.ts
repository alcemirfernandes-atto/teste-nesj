import { Injectable } from '@nestjs/common';
import { IRepository } from '../../../@shared/repositories/repository.interface';
import { Venda } from '../entities/venda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VendaRepository implements IRepository<Venda> {
  constructor(
    @InjectRepository(Venda) private readonly repo: Repository<Venda>,
  ) {}

  async create(data: Partial<Venda>): Promise<Venda> {
    const venda = this.repo.create(data);
    await this.repo.save(venda);
    return venda;
  }

  async findUltimaVenda(): Promise<number> {
    const ultima = await this.repo.findOne({
      where: {},
      order: { nVenda: 'DESC' },
    });
    if (!ultima) {
      return 0;
    }
    return ultima.nVenda;
  }

  async update(id: string, data: Partial<Venda>): Promise<void> {
    await this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findAll(): Promise<Venda[]> {
    return await this.repo.find();
  }

  async findById(id: string): Promise<Venda | null> {
    const venda = await this.repo.findOne({ where: { id } });
    if (!venda) return null;
    return venda;
  }
}
