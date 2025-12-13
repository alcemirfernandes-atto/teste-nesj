"use client";

import NavBar from "@/app/components/baseLayout";
import { Card } from "@/app/components/card/card";

export default function Page() {
  return (
    <>
      <NavBar title="Home" arrowback={true}>
        <div className="p-10">
          <h1>Seja Bem Vindo!!!</h1>
          <div className="w-2xl h-auto rounded-3xl bg-gray-600">
            <div className="flex flex-wrap p-4">
              <Card title="Usuários" value={1} />
              <Card title="Vendas" value={2} />
              <Card title="Produtos" value={3} />
              <Card title="Estoque Total" value={4} />
            </div>
          </div>
        </div>
      </NavBar>
    </>
  );
}
