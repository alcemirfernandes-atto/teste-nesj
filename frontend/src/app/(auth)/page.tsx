"use client";

import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AuthEndpoints } from "@/shared/enums/api-endpoints";
import { apiPublic } from "@/shared/api/axios";
import { ApiInternal, RoutePages } from "@/shared/enums/internal-routes";
import { validarEmail } from "@/shared/validator/email.validator";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ButtonUsage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [erroMsg, setErroMsg] = useState("");
  const [showPass, setShowPass] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErroMsg("");
    setLoading(true);
    try {
      if (!validarEmail(email)) {
        return setErroMsg("Informe um e-mail valido.");
      }

      if (!password.trim()) {
        return setErroMsg("Informe a senha.");
      }

      const resposta = await apiPublic.post(AuthEndpoints.LOGIN, {
        email: email,
        senha: password,
      });

      await fetch(ApiInternal.SAVE_LOGIN, {
        method: "POST",
        body: JSON.stringify(resposta.data),
      });

      router.push(RoutePages.HOME);
    } catch (erro: unknown) {
      if (axios.isAxiosError(erro)) {
        setErroMsg(`${erro}`);
        const mensagem = erro.response?.data?.message || "Erro ao fazer login.";
        setErroMsg(mensagem);
      } else {
        // setErroMsg(`${erro}`);
        setErroMsg("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6">
      <div className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Login
        </h1>

        {erroMsg && <Alert severity="warning">{erroMsg}</Alert>}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              fullWidth
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              type={showPass ? "text" : "password"}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPass((prev) => !prev)}
                    edge="end"
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>

          <Button
            type="submit"
            sx={{ color: "#fff", background: "#000000" }}
            size="large"
            fullWidth
          >
            {loading && <CircularProgress sx={{ color: "#ffff" }} />}
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
