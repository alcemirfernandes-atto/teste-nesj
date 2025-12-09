import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ProdutoRepository } from './repositories/produto.repository';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly repo: ProdutoRepository) {}

  create(dto: CreateProdutoDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findByName(name: string, take = 20) {
    const produto = await this.repo.findByName(name, take);
    if (!produto) {
      throw new NotFoundException('Nenhum produto encontrado');
    }
    return produto;
  }

  async findOne(id: string) {
    const produto = await this.repo.findById(id);

    if (!produto) {
      throw new NotFoundException('Produto inexistente');
    }

    return produto;
  }

  async update(id: string, updateUserDto: Partial<UpdateProdutoDto>) {
    await this.findOne(id);
    return this.repo.update(id, updateUserDto);
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
