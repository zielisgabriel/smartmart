"use server";

import { fetchClient } from "@/lib/fetch-client";

export async function getProductByIdService(productId: number) {
  const response = await fetchClient({
    path: `/api/products/${productId}`
  });

  return await response.json();
}