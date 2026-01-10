"use server"

import { revalidateTag } from "next/cache"

const API_URL = "http://localhost:5000"

export async function importProducts(formData: FormData) {
  const response = await fetch(`${API_URL}/api/import/products`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erro ao importar produtos")
  }

  revalidateTag("products", { expire: 0 })
  return response.json()
}

export async function importCategories(formData: FormData) {
  const response = await fetch(`${API_URL}/api/import/categories`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erro ao importar categorias")
  }

  revalidateTag("categories", { expire: 0 })
  return response.json()
}

export async function importSales(formData: FormData) {
  const response = await fetch(`${API_URL}/api/import/sales`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erro ao importar vendas")
  }

  revalidateTag("sales", { expire: 0 })
  return response.json()
}
