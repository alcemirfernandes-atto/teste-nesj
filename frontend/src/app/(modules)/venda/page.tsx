"use client";
import NavBar from "@/app/components/baseLayout";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { apiPrivate } from "@/shared/api/axios";
import { ApiEndpoints } from "@/shared/enums/api-endpoints";
import { Input } from "@mui/material";

interface Option {
  id: string;
  name: string;
  color: string;
  estoque: number;
}

export default function Venda() {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itensPrice, setitensPrice] = useState<Option[]>([]);
  const [quantity, setQuantity] = useState(0);

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
        <div className="flex flex-row items-center gap-4 p-6 bg-white rounded-xl shadow-md">
          <Input
            type="number"
            value={quantity}
            className="w-24 border rounded px-2 py-1 text-center"
          />
          <Autocomplete
            className="flex-1"
            disablePortal
            options={options}
            getOptionLabel={(option) => option.name}
            loading={loading}
            onInputChange={(_, value) => setInputValue(value)}
            onChange={(_, selectedOption) => {
              if (!selectedOption) return;
              setitensPrice((prev) => [
                ...prev,
                { ...selectedOption, estoque: quantity },
              ]);
              setQuantity(0);
              setInputValue("");
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

        {itensPrice.map((p) => (
          <div className="flex flex-row" key={p.id}>
            <h3>{p.name}</h3>
            <h3>{p.estoque}</h3>
          </div>
        ))}
      </NavBar>
    </>
  );
}
