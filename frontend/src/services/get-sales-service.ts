"use cache";

import { cacheTag } from "next/cache";
import { SaleResponse } from "@/types/sale-response";

const API_URL = "http://localhost:5000";

interface GetSalesParams {
  page?: string | null;
  size?: string | null;
}

export async function getSalesService(params: GetSalesParams): Promise<SaleResponse> {
  cacheTag("sales");

  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", params.page);
  if (params.size) searchParams.set("size", params.size);

  const response = await fetch(`${API_URL}/api/sales?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Falha ao buscar vendas");
  }

  return response.json();
}

export async function getSalesStatsService() {
  cacheTag("sales");

  const response = await fetch(`${API_URL}/api/sales/stats`);

  if (!response.ok) {
    throw new Error("Falha ao buscar estatísticas");
  }

  return response.json();
}
