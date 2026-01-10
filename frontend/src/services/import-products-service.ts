"use server";

import { fetchClient } from "@/lib/fetch-client";

export async function importProductsService(formData: FormData) {
  const response = await fetchClient({
    path: "/api/import/products",
    init: {
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    },
  });

  return response;
}