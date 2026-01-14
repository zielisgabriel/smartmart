"use server";

import { fetchClient } from "@/lib/fetch-client"
import { revalidateTag } from "next/cache";

export async function importCategoriesService(formData: FormData) {
  const response = await fetchClient({
    path: "/api/import/categories",
    init: {
      method: "POST",
      body: formData
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao importar categorias");
  }

  revalidateTag("categories", { expire: 0 });

  return response.json()
}