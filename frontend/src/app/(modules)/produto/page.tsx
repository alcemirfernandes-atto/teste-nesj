"use client";

import NavBar from "@/app/components/baseLayout";
import {
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { apiPrivate } from "shared/api/axios";
import { ApiEndpoints } from "shared/enums/api-endpoints";
import ConfirmDialog from "@/app/components/dialog/confirmation";
import ProdutoForm from "./form/produto-formulario";
import { Produto } from "@/shared/interface/produto/produto.interface";

export default function ProdutoPage() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [product, setProduct] = useState<Produto | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiPrivate.get(ApiEndpoints.PRODUTO);
      setProducts(res.data);
    } catch (e) {
      setError("Ocorreu um erro ao carregar os dados.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleDelete(product: Produto) {
    setProduct(product);
    setOpenConfirm(true);
  }

  function handleEdit(product: Produto) {
    setProduct(product);
    setOpenForm(true);
  }

  function handleCreate() {
    setProduct(null);
    setOpenForm(true);
  }

  if (isLoading) {
    return (
      <NavBar title="Produto" arrowback={true}>
        <LinearProgress />
      </NavBar>
    );
  }
  if (error) {
    return (
      <NavBar title="Produto" arrowback={true}>
        <div className="bg-red-500 text-white p-4 m-10 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Erro</h2>
          <p>{error}</p>
        </div>
      </NavBar>
    );
  }
  return (
    <div>
      <NavBar title="Produto" arrowback={true}>
        <div className=" flex justify-center">
          <div className=" flex justify-center bg-white rounded-xl pt-8 p-5">
            <TableContainer component={Paper}>
              <Table
                sx={{
                  width: "100%",
                  maxWidth: { xs: "100%", sm: 500, md: 800 },
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell
                      sx={{
                        width: 30,
                      }}
                    >
                      Cor
                    </TableCell>
                    <TableCell>Estoque</TableCell>

                    <TableCell align="center">
                      <Tooltip title="Adicionar">
                        <Button onClick={() => handleCreate()}>
                          <AddIcon className="text-white" />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((p, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {p.name}
                      </TableCell>
                      <TableCell>{p.color}</TableCell>
                      <TableCell align="center">{p.estoque}</TableCell>
                      <TableCell>
                        <Tooltip title="Editar">
                          <IconButton onClick={() => handleEdit(p)}>
                            <EditIcon className="text-yellow-500" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar">
                          <IconButton onClick={() => handleDelete(p)}>
                            <DeleteIcon className="text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </NavBar>
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={async () => {
          if (!product) return;
          await apiPrivate.delete(`${ApiEndpoints.PRODUTO}/${product.id}`);
          await loadProducts();
          setOpenConfirm(false);
        }}
      />
      <ProdutoForm
        open={openForm}
        initialData={product ?? undefined}
        onClose={() => setOpenForm(false)}
        onConfirm={async (data: Partial<Produto>) => {
          if (product) {
            await apiPrivate.patch(
              `${ApiEndpoints.PRODUTO}/${product.id}`,
              data
            );
          } else {
            await apiPrivate.post(ApiEndpoints.PRODUTO, data);
          }
          await loadProducts();
          setOpenForm(false);
        }}
      />
    </div>
  );
}
