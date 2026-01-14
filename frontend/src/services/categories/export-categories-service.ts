"use server";

import { fetchClient } from "@/lib/fetch-client";

export async function exportCategoriesService() {
  const response = await fetchClient({
    path: "/api/export/categories"
  });
  
  if (!response.ok) {
    throw new Error("Falha ao exportar categorias");
  }
  
  return response.text();
}
