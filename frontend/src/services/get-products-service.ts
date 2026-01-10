"use cache";

import { cacheTag } from "next/cache";
import { ProductResponse } from "@/types/product-response";

const API_URL = "http://localhost:5000";

interface GetProductsParams {
  page?: string | null;
  size?: string | null;
  sortBy?: string | null;
  sortOrder?: string | null;
  categories?: string | null;
  search?: string | null;
}

export async function getProductsService(params: GetProductsParams): Promise<ProductResponse> {
  cacheTag("products");

  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", params.page);
  if (params.size) searchParams.set("size", params.size);
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.sortOrder) searchParams.set("sortOrder", params.sortOrder);
  if (params.categories) searchParams.set("categories", params.categories);
  if (params.search) searchParams.set("search", params.search);

  const response = await fetch(`${API_URL}/api/products?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Falha ao buscar produtos");
  }

  return response.json();
}
