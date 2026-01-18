"use server";

import { fetchClient } from "@/lib/fetch-client";
import { revalidateTag } from "next/cache";

interface UpdateProductData {
  id: number
  name: string
  description: string
  price: number
  category_id: number
  brand: string
}

export async function updateProductService(data: UpdateProductData) {
  const response = await fetchClient({
    path: `/api/products/update/${data.id}`,
    init: {
      body: JSON.stringify(data),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar produto");
  }

  revalidateTag("products", { expire: 0 });

  return response.json();
}