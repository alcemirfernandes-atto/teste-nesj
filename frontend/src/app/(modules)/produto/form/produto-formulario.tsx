"use client";

import { ProdutoCreate } from "@/shared/interface/produto/produto.interface";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

interface ProdutoFormProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: Partial<ProdutoCreate>) => void;
  initialData?: ProdutoCreate;
}

export default function ProdutoForm({
  open,
  onClose,
  onConfirm,
  initialData,
}: ProdutoFormProps) {
  const [formData, setFormData] = useState<Partial<ProdutoCreate>>({
    name: "",
    color: "",
    codBa: "",
    estoque: 0,
  });

  const [price, setPrice] = useState("0");

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setTimeout(() => setFormData(initialData), 0);
      setTimeout(() => setPrice(initialData.preco.toString()), 0);
    } else {
      setTimeout(
        () => setFormData({ name: "", color: "", estoque: 0, codBa: "" }),
        0
      );
      setTimeout(() => setPrice(""), 0);
    }
  }, [initialData, open]);

  const dialogTitle = initialData ? "Atualizar Produto" : "Criar Produto";
  return (
    <Dialog
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            p: 2,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          },
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <form>
          <div className="flex flex-col m-4">
            <Input
              placeholder="Nome"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Input
              placeholder="Cor"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Input
              placeholder="Cod Barra"
              value={formData.codBa}
              onChange={(e) =>
                setFormData({ ...formData, codBa: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Input
              type="text"
              placeholder="Preço"
              value={price}
              inputProps={{ step: "0.01", min: 0 }}
              onChange={(e) => setPrice(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Input
              type="number"
              placeholder="Estoque"
              value={formData.estoque}
              onChange={(e) =>
                setFormData({ ...formData, estoque: Number(e.target.value) })
              }
              sx={{ mb: 2 }}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ backgroundColor: "red" }}>
          Cancelar
        </Button>
        <Button
          onClick={() => {
            const preco = Number(price.replace(",", "."));

            onConfirm({
              ...formData,
              preco,
            });
          }}
          sx={{ backgroundColor: "green" }}
        >
          Gravar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
