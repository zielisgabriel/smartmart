import { SalesList } from "@/components/sales-list"
import { SalesListSkeleton } from "@/components/sales-list-skeleton"
import { SalesDashboard } from "@/components/sales-dashboard"
import { getProductsService } from "@/services/get-products-service"
import { getSalesService, getMonthlySalesStatsService } from "@/services/get-sales-service"
import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, List } from "lucide-react"

interface SalesPageProps {
  searchParams: Promise<{ page?: string; year?: string }>
}

async function SalesContent({ searchParams }: SalesPageProps) {
  const { page, year } = await searchParams
  const salesPromise = getSalesService({ page: page ?? null })
  const productsPromise = getProductsService({ page: null })
  // Usa 2025 como padrão pois os dados importados são de 2025
  const currentYear = year ? parseInt(year) : 2025
  const monthlyStatsPromise = getMonthlySalesStatsService(currentYear)

  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md">
        <TabsTrigger value="dashboard" className="gap-2">
          <BarChart3 className="h-4 w-4" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="history" className="gap-2">
          <List className="h-4 w-4" />
          Histórico
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard" className="mt-6">
        <SalesDashboard monthlyStatsPromise={monthlyStatsPromise} year={currentYear} />
      </TabsContent>
      <TabsContent value="history" className="mt-6">
        <SalesList
          salesPromise={salesPromise}
          productsPromise={productsPromise}
        />
      </TabsContent>
    </Tabs>
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
