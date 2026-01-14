"use server";

import { fetchClient } from "@/lib/fetch-client";
import { revalidateTag } from "next/cache"

export async function deleteSaleService(id: number) {
  const response = await fetchClient({
    path: `/api/sales/delete/${id}`,
    init: {
      method: "DELETE"
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar venda");
  }

  revalidateTag("sales", { expire: 0 });
}
