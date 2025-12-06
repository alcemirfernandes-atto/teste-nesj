import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, updateUserDto: Partial<UpdateProdutoDto>) {
    return this.repo.update(id, updateUserDto);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
