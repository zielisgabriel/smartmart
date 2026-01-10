"use server";

import { revalidateTag } from "next/cache";

export async function revalidateProducts() {
  revalidateTag("products", { expire: 0 });
}

export async function revalidateCategories() {
  revalidateTag("categories", { expire: 0 });
}

export async function revalidateSales() {
  revalidateTag("sales", { expire: 0 });
}

export async function revalidateAll() {
  revalidateTag("products", { expire: 0 });
  revalidateTag("categories", { expire: 0 });
  revalidateTag("sales", { expire: 0 });
}
