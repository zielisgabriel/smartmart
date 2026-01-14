"use server";

import { fetchClient } from "@/lib/fetch-client"
import { revalidateTag } from "next/cache";

export async function deleteCategoryService(id: number) {
  const response = await fetchClient({
    path: `/api/categories/delete/${id}`,
    init: {
      method: "DELETE"
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar categoria")
  }

  revalidateTag("categories", { expire: 0 })
  revalidateTag("products", { expire: 0 })
}
