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
    <Dialog open={open} onClose={onClose}>
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
