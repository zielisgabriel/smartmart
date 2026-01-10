"use server"

import { revalidateTag } from "next/cache"

const API_URL = "http://localhost:5000"

type CreateSaleData = {
  product_id: number
  quantity: number
  total_price: number
  date?: string
}

export async function createSale(data: CreateSaleData) {
  const response = await fetch(`${API_URL}/api/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Erro ao registrar venda")
  }

  revalidateTag("sales", { expire: 0 })
  return response.json()
}

export async function deleteSale(id: number) {
  const response = await fetch(`${API_URL}/api/sales/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Erro ao deletar venda")
  }

  revalidateTag("sales", { expire: 0 })
}
