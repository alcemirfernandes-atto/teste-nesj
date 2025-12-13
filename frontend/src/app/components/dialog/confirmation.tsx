"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  content?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            p: 2,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          },
        },
      }}
    >
      <DialogTitle>Confirmação</DialogTitle>
      <DialogContent>Tem certeza?</DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ backgroundColor: "red" }}>
          Cancelar
        </Button>
        <Button onClick={onConfirm} sx={{ backgroundColor: "green" }}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
