"use client";

import NavBar from "@/app/components/baseLayout";
import { Button, IconButton, LinearProgress } from "@mui/material";
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
    <div className="w-screen min-h-screen bg-cyan-100">
      <NavBar title="Produto" arrowback={true}>
        <div className=" flex justify-end mt-4 mr-8 ">
          <Button onClick={() => handleCreate()}>
            <AddIcon className="text-white" />
            Adcionar
          </Button>
        </div>
        <div className=" flex justify-center  ">
          <div className=" flex justify-center w-250 mt-4 m-8 bg-white rounded-xl">
            <div className="flex justify-center w-200 ">
              <table>
                <thead>
                  <tr>
                    <th className="p-4">Nome</th>
                    <th className="p-4">Cor</th>
                    <th className="p-4">Estoque</th>
                    <th className="p-4">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p, index) => (
                    <tr key={index}>
                      <td className="p-2">{p.name}</td>
                      <td className="p-2">{p.color ?? "-"}</td>
                      <td className="p-2">{p.estoque}</td>
                      <td className="p-2">
                        <IconButton onClick={() => handleEdit(p)}>
                          <EditIcon className="text-yellow-500" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(p)}>
                          <DeleteIcon className="text-red-500" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
