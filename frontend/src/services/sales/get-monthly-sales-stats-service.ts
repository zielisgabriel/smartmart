"use server";

import { fetchClient } from "@/lib/fetch-client";
import { cacheTag } from "next/cache";

export interface MonthlySalesStats {
  month: number;
  total_quantity: number;
  total_revenue: number;
  sales_count: number;
}

export async function getMonthlySalesStatsService(year?: number): Promise<MonthlySalesStats[]> {
  "use cache";

  cacheTag("sales");

  const searchParams = new URLSearchParams();
  if (year) searchParams.set("year", year.toString());

  const response = await fetchClient({
    path: `/api/sales/stats/monthly?${searchParams.toString()}`
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar estatísticas mensais");
  }

  return response.json();
}