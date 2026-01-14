"use server";

import { cacheTag } from "next/cache"
import { CategoryResponse } from "@/types/category-response"
import { fetchClient } from "@/lib/fetch-client"


export async function getCategoriesService(): Promise<CategoryResponse> {
  "use cache";

  cacheTag("categories");
  
  const response = await fetchClient({
    path: "/api/categories/list"
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar categorias")
  }

  const categories = await response.json()
  return { categories }
}
