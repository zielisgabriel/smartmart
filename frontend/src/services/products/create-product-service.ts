"use server";

import { fetchClient } from "@/lib/fetch-client"
import { revalidateTag } from "next/cache"

export interface CreateProductData {
  name: string
  description: string
  price: number
  category_id: number
  brand: string
}

export async function createProductService(data: CreateProductData) {
  const response = await fetchClient({
    path: "/api/products/create",
    init: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao criar produto");
  }

  revalidateTag("products", { expire: 0 });

  return await response.json()
}