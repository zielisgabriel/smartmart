import { Pageable } from "./pageable"
import { Sale } from "./sale"

export interface SaleResponse extends Pageable {
  sales: Sale[]
}
