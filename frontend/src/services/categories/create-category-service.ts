"use server";

import { fetchClient } from "@/lib/fetch-client"
import { revalidateTag } from "next/cache"

interface CreateCategoryData {
  name: string
}

export async function createCategoryService(data: CreateCategoryData) {
  const response = await fetchClient({
    path: "/api/categories/create",
    init: {
      method: "POST",
      body: JSON.stringify(data)
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao criar categoria");
  }

  revalidateTag("categories", { expire: 0 });
  
  return response.json();
}