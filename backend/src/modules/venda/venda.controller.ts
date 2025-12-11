import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VendaService } from './venda.service';
import { CreateVenda, UpdateVenda } from './dto/venda.dto';
import { Auth } from '../auth/decorators/auth';
import { CreateItemVenda, UpdateItemVenda } from './dto/items.dto';

@Controller('venda')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  //Venda
  @Auth()
  @Post()
  createVenda(@Body() data: CreateVenda) {
    return this.vendaService.create(data);
  }

  @Auth()
  @Get(':id')
  getVenda(@Param('id') id: string) {
    return this.vendaService.getVendaById(id);
  }

  @Auth()
  @Patch(':id')
  updateVenda(@Param('id') id: string, @Body() data: Partial<UpdateVenda>) {
    return this.vendaService.updateVenda(id, data);
  }

  @Auth()
  @Delete(':id')
  deleteVenda(@Param('id') id: string) {
    return this.vendaService.deleteVenda(id);
  }

  //Item
  @Auth()
  @Post('item/:id')
  addItem(@Param('id') id: string, @Body() data: CreateItemVenda) {
    return this.vendaService.createItemVenda(id, data);
  }

  @Auth()
  @Delete('item/:id')
  deleteItem(@Param('id') id: string) {
    return this.vendaService.deleteItem(id);
  }

  @Auth()
  @Patch('item/:id')
  updateItem(@Param('id') id: string, @Body() data: Partial<UpdateItemVenda>) {
    return this.vendaService.updateItem(id, data);
  }
}
