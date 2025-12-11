import { Injectable, NotFoundException } from '@nestjs/common';
import { VendaRepository } from './repositories/venda.repository';
import { ItemRepository } from './repositories/item.repository';
import { CreateVenda, IOutVenda, UpdateVenda } from './dto/venda.dto';
import { CreateItemVenda, UpdateItemVenda } from './dto/items.dto';

@Injectable()
export class VendaService {
  constructor(
    private readonly vendaRepo: VendaRepository,
    private readonly itemRepo: ItemRepository,
  ) {}

  async create(data: CreateVenda): Promise<IOutVenda> {
    const nVenda = (await this.vendaRepo.findUltimaVenda()) + 1;

    const vendaCriada = await this.vendaRepo.create({
      nVenda,
      nomeCliente: data.nomeCliente,
    });

    const itensCriados = await Promise.all(
      data.itens.map((item) =>
        this.itemRepo.create({
          ...item,
          idVenda: vendaCriada.id,
        }),
      ),
    );

    return {
      idVenda: vendaCriada.id,
      nVenda: vendaCriada.nVenda,
      itens: itensCriados,
    };
  }

  async getVendaById(id: string): Promise<IOutVenda> {
    const venda = await this.vendaRepo.findById(id);
    const item = await this.itemRepo.findByVendaId(id);

    if (!venda || !item) {
      throw new NotFoundException();
    }

    return {
      idVenda: venda.id,
      nVenda: venda.nVenda,
      itens: item,
    };
  }

  async deleteItem(id: string) {
    await this.itemRepo.delete(id);
  }

  async deleteVenda(id: string) {
    await this.vendaRepo.delete(id);
  }

  async updateItem(id: string, data: Partial<UpdateItemVenda>) {
    await this.itemRepo.update(id, data);
  }

  async updateVenda(id: string, data: Partial<UpdateVenda>) {
    await this.vendaRepo.update(id, data);
  }

  async createItemVenda(
    id: string,
    data: Partial<CreateItemVenda>,
  ): Promise<Partial<IOutVenda>> {
    const item = await this.itemRepo.create({
      ...data,
      idVenda: id,
    });

    return {
      idVenda: id,
      itens: [item],
    };
  }
}
