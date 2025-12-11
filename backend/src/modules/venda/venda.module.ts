import { Module } from '@nestjs/common';
import { VendaController } from './venda.controller';
import { VendaRepository } from './repositories/venda.repository';
import { VendaService } from './venda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemVenda } from './entities/item.entity';
import { Venda } from './entities/venda.entity';
import { ItemRepository } from './repositories/item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Venda, ItemVenda])],
  controllers: [VendaController],
  providers: [VendaService, VendaRepository, ItemRepository],
})
export class VendaModule {}
