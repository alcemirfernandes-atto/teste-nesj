import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  color: string;
  @ApiProperty()
  estoque: number;
  @ApiProperty()
  codBa: string;
  @ApiProperty()
  preco: number;
}
