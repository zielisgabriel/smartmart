"use server";

import { revalidateTag } from "next/cache";

const API_URL = process.env.API_URL || "http://localhost:5000";

export async function importSalesService(formData: FormData) {
  const response = await fetch(`${API_URL}/api/import/sales`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao importar vendas");
  }

  revalidateTag("sales", { expire: 0 });

  return response.json();
}