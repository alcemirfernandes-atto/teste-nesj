import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.gard';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDto: CreateProdutoDto) {
    return this.produtoService.create(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.produtoService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('search/:name')
  findByName(@Param('name') name: string) {
    return this.produtoService.findByName(name, 20);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<UpdateProdutoDto>,
  ) {
    return this.produtoService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.produtoService.delete(id);
  }
}
