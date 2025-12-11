import { CreateItemVenda } from './items.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVenda {
  @ApiProperty()
  nomeCliente: string;
  @ApiProperty({ type: () => [CreateItemVenda] })
  itens: CreateItemVenda[];
}

export class UpdateVenda {
  @ApiProperty()
  nomeCliente: string;
}

export class IOutVenda {
  idVenda: string;
  nVenda: number;
  itens: CreateItemVenda[];
}
