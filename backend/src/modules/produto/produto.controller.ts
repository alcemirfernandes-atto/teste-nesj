import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

import { Auth } from '../auth/decorators/auth';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Auth()
  @Post()
  create(@Body() createDto: CreateProdutoDto) {
    return this.produtoService.create(createDto);
  }
  @Auth()
  @Get()
  findAll() {
    return this.produtoService.findAll();
  }
  @Auth()
  @Get('search/:name')
  findByName(@Param('name') name: string) {
    return this.produtoService.findByName(name, 20);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<UpdateProdutoDto>,
  ) {
    return this.produtoService.update(id, updateDto);
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.produtoService.delete(id);
  }
}
