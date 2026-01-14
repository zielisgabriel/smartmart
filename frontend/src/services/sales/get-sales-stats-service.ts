"use server";

import { fetchClient } from "@/lib/fetch-client";
import { cacheTag } from "next/cache";

export async function getSalesStatsService() {
  "use cache";

  cacheTag("sales");

  const response = await fetchClient({
    path: "/api/sales/stats"
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar estatísticas");
  }

  return response.json();
}