import { ApiProperty } from '@nestjs/swagger';

export class UpdateProdutoDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  color: string;
  @ApiProperty()
  estoque: number;
  @ApiProperty()
  preco: number;
}
