"use server";

import { cacheTag } from "next/cache";
import { SaleResponse } from "@/types/sale-response";
import { fetchClient } from "@/lib/fetch-client";

interface GetSalesParams {
  page?: string | null;
  size?: string | null;
}

export async function getSalesService(params: GetSalesParams): Promise<SaleResponse> {
  "use cache";

  cacheTag("sales");

  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", params.page);
  if (params.size) searchParams.set("size", params.size);

  const response = await fetchClient({
    path: `/api/sales/list?${searchParams.toString}`
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar vendas");
  }

  return response.json();
}
