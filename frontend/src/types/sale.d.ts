import { Product } from "./product"

export type Sale = {
  id: number,
  product: Product,
  quantity: number,
  total_price: number,
  date: string
}