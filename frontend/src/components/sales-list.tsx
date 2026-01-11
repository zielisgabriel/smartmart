"use client";

import { use, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SaleResponse } from "@/types/sale-response";
import { ProductResponse } from "@/types/product-response";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import {
  TrendingUp,
  Package,
  Calendar,
  DollarSign,
  ReceiptIcon,
  ImportIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Pagination } from "./pagination";
import { Button } from "./ui/button";
import { ImportSalesHistoryModal } from "./import-sales-history-modal";
import { ExportButton } from "./export-button";

interface SalesListProps {
  salesPromise: Promise<SaleResponse>;
  productsPromise: Promise<ProductResponse>;
}

export function SalesList({ salesPromise, productsPromise }: SalesListProps) {
  const [isSalesHistoryModalOpen, setIsSalesHistoryModalOpen] = useState<boolean>(false);
  const { page, totalPages, totalElements, sales } = use(salesPromise);
  const { products } = use(productsPromise);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getProductName = (productId: number): string => {
    const product = products.find((p) => p.id === productId);
    return product?.name || `Produto #${productId}`;
  };

  const getProductBrand = (productId: number): string => {
    const product = products.find((p) => p.id === productId);
    return product?.brand || "-";
  };

  const totalRevenue = sales.reduce((acc, sale) => acc + Number(sale.total_price), 0);
  const totalQuantity = sales.reduce((acc, sale) => acc + sale.quantity, 0);
  const averageOrderValue = sales.length > 0 ? totalRevenue / sales.length : 0;

  if (sales.length === 0) {
    return (
      <>
        <Card className="mt-4">
          <CardContent className="py-12">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <ReceiptIcon className="h-10 w-10" />
                </EmptyMedia>
                <EmptyTitle>Nenhuma venda registrada</EmptyTitle>
                <EmptyDescription>
                  As vendas aparecerão aqui quando forem realizadas
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  onClick={() => setIsSalesHistoryModalOpen(true)}
                >
                  <ImportIcon />
                  Importar histórico
                </Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>

        <ImportSalesHistoryModal
          open={isSalesHistoryModalOpen}
          onOpenChange={open => !open && setIsSalesHistoryModalOpen(false)}
        />
      </>
    );
  }

  return (
    <section className="space-y-4 mt-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatPrice(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Baseado em {totalElements} vendas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Itens Vendidos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total de unidades
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ticket Médio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(averageOrderValue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Por transação</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <ReceiptIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Histórico de Vendas</CardTitle>
                <CardDescription>
                  Registro de todas as transações realizadas
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ExportButton type="sales" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/50">
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Data
                    </div>
                  </TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="hidden md:table-cell">Marca</TableHead>
                  <TableHead className="text-center">Qtd</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow
                    key={sale.id}
                    className="transition-colors hover:bg-muted/50"
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      #{sale.id.toString().padStart(4, "0")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {formatDate(sale.date).split(",")[0]}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(sale.date).split(",")[1]?.trim() || ""}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {sale.product.name}
                        </span>
                        <span className="text-xs text-muted-foreground md:hidden">
                          {sale.product.brand}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {sale.product.brand}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="font-mono">
                        {sale.quantity}x
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatPrice(sale.total_price)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-6">
          <Pagination
            page={page}
            totalPages={totalPages}
            totalElements={totalElements}
            listLength={sales.length}
          />
        </CardFooter>
      </Card>
    </section>
  );
}
