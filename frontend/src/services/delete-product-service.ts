"use server";

import { fetchClient } from "@/lib/fetch-client";
import { revalidateTag } from "next/cache";

export async function deleteProductService(productId: number) {
  await fetchClient({
    path: `/api/products/${productId}`,
    init: {
      method: "DELETE"
    }
  });

  revalidateTag("products", { expire: 0 });
  revalidateTag("sales", { expire: 0 });
}