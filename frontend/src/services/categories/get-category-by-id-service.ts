"use server";

import { fetchClient } from "@/lib/fetch-client";

export async function getCategoryByIdService(category_id: number) {
  const response = await fetchClient({
    path: `/api/categories/${category_id}`
  });

  return await response.json();
}