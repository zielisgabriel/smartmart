"use server";

import { fetchClient } from "@/lib/fetch-client";

export async function exportProductsService() {
  const response = await fetchClient({
    path: "/api/export/products"
  });
  
  if (!response.ok) {
    throw new Error("Falha ao exportar produtos");
  }

  return response.text();
}
