"use server"

import { revalidateTag } from "next/cache"

const API_URL = "http://localhost:5000"

type CreateProductData = {
  name: string
  description: string
  price: number
  category_id: number
  brand: string
}

type UpdateProductData = CreateProductData & {
  id: number
}

export async function createProduct(data: CreateProductData) {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Erro ao criar produto")
  }

  revalidateTag("products", { expire: 0 })
  return response.json()
}

export async function updateProduct(data: UpdateProductData) {
  const response = await fetch(`${API_URL}/api/products/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Erro ao atualizar produto")
  }

  revalidateTag("products", { expire: 0 })
  return response.json()
}

export async function deleteProduct(id: number) {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Erro ao deletar produto")
  }

  revalidateTag("products", { expire: 0 })
  revalidateTag("sales", { expire: 0 })
}
