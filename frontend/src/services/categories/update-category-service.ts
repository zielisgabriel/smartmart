"use server";

import { fetchClient } from "@/lib/fetch-client";
import { revalidateTag } from "next/cache"

interface UpdateCategoryData {
  id: number,
  name: string
}

export async function updateCategoryService(data: UpdateCategoryData) {
  const response = await fetchClient({
    path: `/api/categories/update/${data.id}`,
    init: {
      method: "PUT",
      body: JSON.stringify(data),
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar categoria");
  }

  revalidateTag("categories", { expire: 0 });

  return response.json();
}