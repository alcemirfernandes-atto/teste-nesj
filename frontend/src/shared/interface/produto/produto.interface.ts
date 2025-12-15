export type Produto = {
  id: string;
  name: string;
  color: string;
  codBa: string;
  preco: number;
  estoque: number;
};

export type ProdutoCreate = {
  name: string;
  color: string;
  codBa: string;
  preco: number;
  estoque: number;
};
