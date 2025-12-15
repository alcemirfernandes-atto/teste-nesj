"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
} from "@mui/material";
import { useState } from "react";

interface ProdutoFormProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (newQtd: number) => void;
  initialData: number;
}

export default function EditItem({
  open,
  onClose,
  onConfirm,
  initialData,
}: ProdutoFormProps) {
  const [newQtd, setNewQtd] = useState(0);

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
      <DialogTitle>Nova Qtd</DialogTitle>
      <DialogContent>
        <form>
          <div className="flex flex-row m-4 gap-4">
            <div className="flex flex-col m-4 gap-4">
              <p>Qtd</p>
              <Input
                type="number"
                placeholder="Qtd"
                value={initialData}
                sx={{ mb: 2 }}
              />
            </div>

            <div className="flex flex-col m-4 gap-4">
              <p>Nova Qtd</p>
              <Input
                type="number"
                placeholder="Nova Qtd"
                value={newQtd}
                onChange={(e) => setNewQtd(Number(e.target.value))}
                sx={{ mb: 2 }}
              />
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ backgroundColor: "red" }}>
          Cancelar
        </Button>
        <Button
          onClick={() => onConfirm(newQtd)}
          sx={{ backgroundColor: "green" }}
        >
          Gravar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
