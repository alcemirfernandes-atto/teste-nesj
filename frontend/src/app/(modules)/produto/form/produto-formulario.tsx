"use client";

import { ProdutoCreate } from "@/shared/interface/produto/produto.interface";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
} from "@mui/material";
import { useEffect, useState } from "react";

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
    estoque: 0,
  });

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setTimeout(() => setFormData(initialData), 0);
    } else {
      setTimeout(() => setFormData({ name: "", color: "", estoque: 0 }), 0);
    }
  }, [initialData, open]);

  const dialogTitle = initialData ? "Atualizar Produto" : "Criar Produto";
  return (
    <Dialog open={open} onClose={onClose}>
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
          onClick={() => onConfirm(formData)}
          sx={{ backgroundColor: "green" }}
        >
          Gravar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
