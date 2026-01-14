"use server";

import { fetchClient } from "@/lib/fetch-client";
import { revalidateTag } from "next/cache";

export async function importSalesService(formData: FormData) {
  const response = await fetchClient({
    path: "/api/import/sales",
    init: {
      method: "POST",
      body: formData
    }
  })

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao importar vendas");
  }

  revalidateTag("sales", { expire: 0 });

  return response.json();
}
