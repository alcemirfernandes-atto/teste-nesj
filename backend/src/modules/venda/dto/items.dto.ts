import { ApiProperty } from '@nestjs/swagger';

export class CreateItemVenda {
  @ApiProperty()
  idProduto: string;
  @ApiProperty()
  qtd: number;
  @ApiProperty()
  desconto: number;
}

export class UpdateItemVenda {
  @ApiProperty()
  qtd: number;
  @ApiProperty()
  desconto: number;
}
