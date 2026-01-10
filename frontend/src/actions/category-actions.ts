"use server"

import { revalidateTag } from "next/cache"

const API_URL = "http://localhost:5000"

type CreateCategoryData = {
  name: string
}

type UpdateCategoryData = CreateCategoryData & {
  id: number
}

export async function createCategory(data: CreateCategoryData) {
  const response = await fetch(`${API_URL}/api/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Erro ao criar categoria")
  }

  revalidateTag("categories", { expire: 0 })
  return response.json()
}

export async function updateCategory(data: UpdateCategoryData) {
  const response = await fetch(`${API_URL}/api/categories/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Erro ao atualizar categoria")
  }

  revalidateTag("categories", { expire: 0 })
  return response.json()
}

export async function deleteCategory(id: number) {
  const response = await fetch(`${API_URL}/api/categories/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Erro ao deletar categoria")
  }

  revalidateTag("categories", { expire: 0 })
  revalidateTag("products", { expire: 0 })
}
