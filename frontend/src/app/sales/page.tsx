import { SalesList } from "@/components/sales-list"
import { SalesListSkeleton } from "@/components/sales-list-skeleton"
import { getProductsService } from "@/services/get-products-service"
import { getSalesService } from "@/services/get-sales-service"
import { Suspense } from "react"

interface SalesPageProps {
  searchParams: Promise<{ page?: string }>
}

async function SalesContent({ searchParams }: SalesPageProps) {
  const { page } = await searchParams
  const salesPromise = getSalesService({ page: page ?? null })
  const productsPromise = getProductsService({ page: null })

  return (
    <SalesList
      salesPromise={salesPromise}
      productsPromise={productsPromise}
    />
  )
}

export default function SalesPage({ searchParams }: SalesPageProps) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <Suspense fallback={<SalesListSkeleton />}>
        <SalesContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
