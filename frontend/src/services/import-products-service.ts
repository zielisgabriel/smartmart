"use server";

import { fetchClient } from "@/lib/fetch-client";
import { revalidateTag } from "next/cache";

export async function importProductsService(formData: FormData) {
  const response = await fetchClient({
    path: "/api/import/products",
    init: {
      body: formData,
      method: "POST"
    },
  });

  revalidateTag("products", {expire: 0});

  return response;
}