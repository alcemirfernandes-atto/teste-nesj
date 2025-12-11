"use client";

import { useEffect, useState } from "react";
import NavBar from "@/app/components/baseLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { apiPrivate } from "@/shared/api/axios";
import { ApiEndpoints } from "@/shared/enums/api-endpoints";
import { Card } from "@/app/components/card/card";
import { LinearProgress } from "@mui/material";
import { Stats } from "@/shared/interface/dashboard/dashboard.interface";

const data = [
  { day: "Seg", sales: 120 },
  { day: "Ter", sales: 240 },
  { day: "Qua", sales: 180 },
  { day: "Qui", sales: 320 },
  { day: "Sex", sales: 260 },
];

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiPrivate.get(ApiEndpoints.DASHBOARD);
      setStats(res.data);
    } catch (e) {
      setError("Ocorreu um erro ao carregar os dados.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <NavBar title="Dashboard" arrowback={true}>
        <LinearProgress />
      </NavBar>
    );
  }
  if (error || !stats) {
    return (
      <NavBar title="Dashboard" arrowback={true}>
        <div className="bg-red-500 text-white p-4 m-10 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Erro</h2>
          <p>{error}</p>
        </div>
      </NavBar>
    );
  }
  return (
    <>
      <NavBar title="Dashboard" arrowback={true}>
        <div className="min-h-screen  bg-cyan-100 p-10">
          <div className="grid grid-cols-4 pb-8 gap-6 text-gray-100">
            <Card title="Usuários" value={stats.users} />
            <Card title="Vendas" value={stats.sales} />
            <Card title="Produtos" value={stats.produts} />
            <Card title="Estoque Total" value={stats.estoqueTotal} />
          </div>
          <div className="flex flex-row gap-8">
            <LineChart width={400} height={250} data={data}>
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
            </LineChart>
            <BarChart width={400} height={250} data={data}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </NavBar>
    </>
  );
}
