"use server";

import { fetchClient } from "@/lib/fetch-client";
import { revalidateTag } from "next/cache";

export async function importProductsService(formData: FormData) {
  const response = await fetchClient({
    path: "/api/import/products",
    init: {
      method: "POST",
      body: formData
    },
  });

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erro ao importar produtos");
  }

  revalidateTag("products", { expire: 0 });

  return response.json()
}