import { ProductList } from "@/components/product-list"
import { ProductListSkeleton } from "@/components/product-list-skeleton"
import { getCategoriesService } from "@/services/categories/get-categories-service"
import { getProductsService } from "@/services/products/get-products-service"
import { Suspense } from "react"

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string
    sortBy?: string
    sortOrder?: string
    categories?: string
    search?: string
  }>
}

async function ProductsContent({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const productsPromise = getProductsService({
    page: params.page ?? null,
  })
  const categoriesPromise = getCategoriesService()

  return (
    <ProductList
      productsPromise={productsPromise}
      categoriesPromise={categoriesPromise}
    />
  )
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductsContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
