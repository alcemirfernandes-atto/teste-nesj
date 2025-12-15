"use client";
import NavBar from "@/app/components/baseLayout";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { apiPrivate } from "@/shared/api/axios";
import { ApiEndpoints } from "@/shared/enums/api-endpoints";
import {
  IconButton,
  Input,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Fab,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import EditItem from "./formEdit/edit-produto";
import ConfirmDialog from "@/app/components/dialog/confirmation";

interface Option {
  id: string;
  name: string;
  color: string;
  estoque: number;
}

interface Item {
  id: string;
  name: string;
  qtd: number;
}

export default function Venda() {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itensPrice, setItensPrice] = useState<Item[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [product, setProduct] = useState<Item | null>();

  async function fetchData(query: string) {
    setLoading(true);
    try {
      const res = await apiPrivate.get(
        `${ApiEndpoints.SEARCH_PRODUTO}${query}`
      );
      setOptions(res.data);
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (inputValue.length < 3) {
      setOptions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchData(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  function addItem(newItem: Option) {
    const item = itensPrice.find((item) => item.id === newItem.id);

    if (!item) {
      setItensPrice((prev) => [
        ...prev,
        {
          id: newItem.id,
          name: newItem.name,
          qtd: quantity,
        },
      ]);
    } else {
      setItensPrice((prev) =>
        prev.map((p) =>
          p.id === newItem.id ? { ...p, qtd: p.qtd + quantity } : p
        )
      );
    }

    setQuantity(1);
    setSelectedOption(null);
    setInputValue("");
  }

  function editItem(id: string, newQtd: number) {
    setItensPrice((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qtd: newQtd } : p))
    );
  }

  function deleteItem(id: string) {
    const filter = itensPrice.filter((p) => p.id === id);
    setItensPrice(filter);
  }

  async function handleSave() {
    setLoading(true);
    try {
      const res = await apiPrivate.post(ApiEndpoints.VENDA, {
        nomeCliente: "",
        itens: itensPrice.map((item) => ({
          idProduto: item.id,
          qtd: item.qtd,
          desconto: 0,
        })),
      });
      return res.data;
    } catch (e) {
      setError(`${e}`);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(item: Item) {
    setProduct(item);
    setOpenForm(true);
  }

  function handleDelete(item: Item) {
    setProduct(item);
    setOpenConfirm(true);
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
    <>
      <NavBar title="Venda" arrowback={true}>
        <div className="p-6">
          <div className="flex flex-row items-center gap-4 p-4 mb-5 bg-white rounded-xl shadow-md">
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="flex-1 w-24 border rounded px-2 py-1 text-center"
            />
            <Autocomplete
              className="flex-3"
              disablePortal
              options={options}
              getOptionLabel={(option) => option.name}
              loading={loading}
              value={selectedOption}
              inputValue={inputValue}
              onInputChange={(_, value) => setInputValue(value)}
              onChange={(_, newValue) => {
                if (!newValue) return;
                addItem(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Produto/Código"
                  variant="outlined"
                  size="small"
                />
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className=" flex justify-center items-start">
              <Image
                src="https://placehold.co/600x400/png"
                alt="Imagem Produto"
                width={600}
                height={400}
                className="w-2/3 h-auto rounded-lg"
              />
            </div>
            <div className="w-auto">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Quantidade</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itensPrice.map((p, index) => (
                      <TableRow key={index}>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.qtd}</TableCell>
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
            <div className="h-20"></div>
          </div>
        </div>
        <footer className="fixed bottom-4 right-4">
          <Tooltip title={"Gravar a venda"}>
            <Fab
              onClick={() => handleSave()}
              sx={{ color: "white", background: "green" }}
            >
              <SaveIcon />
            </Fab>
          </Tooltip>
        </footer>

        <EditItem
          open={openForm}
          initialData={product?.qtd ?? 0}
          onClose={() => setOpenForm(false)}
          onConfirm={async (newQtd: number) => {
            if (!product) return;
            editItem(product.id, newQtd);
            setProduct(null);
            setOpenForm(false);
          }}
        />

        <ConfirmDialog
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
          onConfirm={function (): void {
            if (!product) return;
            deleteItem(product.id);
            setProduct(null);
            setOpenConfirm(false);
          }}
        ></ConfirmDialog>
      </NavBar>
    </>
  );
}
