import { Pageable } from "./pageable"
import { Product } from "./product"

export interface ProductResponse extends Pageable {
  products: Product[]
}