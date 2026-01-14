"use server";

import { fetchClient } from "@/lib/fetch-client";
import { revalidateTag } from "next/cache";

type CreateSaleData = {
  product_id: number
  quantity: number
  total_price: number
  date?: string
}

export async function createSaleService(data: CreateSaleData) {
  const response = await fetchClient({
    path: "/api/sales",
    init: {
      method: "POST",
      body: JSON.stringify(data)
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar venda");
  }

  revalidateTag("sales", { expire: 0 });

  return response.json();
}