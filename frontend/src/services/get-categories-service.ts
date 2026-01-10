"use cache"

import { cacheTag } from "next/cache"
import { CategoryResponse } from "@/types/category-response"

const API_URL = "http://localhost:5000"

export async function getCategoriesService(): Promise<CategoryResponse> {
  cacheTag("categories")

  const response = await fetch(`${API_URL}/api/categories`)

  if (!response.ok) {
    throw new Error("Falha ao buscar categorias")
  }

  const categories = await response.json()
  return { categories }
}
