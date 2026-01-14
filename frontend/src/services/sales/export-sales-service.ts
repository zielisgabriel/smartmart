"use server";

import { fetchClient } from "@/lib/fetch-client";

export async function exportSalesService() {
  const response = await fetchClient({
    path: "/api/export/sales"
  });
  
  if (!response.ok) {
    throw new Error("Falha ao exportar vendas");
  }

  return response.text();
}