export type Produto = {
  id: string;
  name: string;
  color: string;
  estoque: number;
};

export type ProdutoCreate = {
  name: string;
  color: string;
  estoque: number;
};
