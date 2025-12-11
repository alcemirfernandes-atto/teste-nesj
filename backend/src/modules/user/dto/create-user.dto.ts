import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  idade: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  senha: string;
}
