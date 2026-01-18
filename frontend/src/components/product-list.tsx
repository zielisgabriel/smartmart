"use client";

import { use, useState } from "react";
import { Pagination } from "./pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ProductResponse } from "@/types/product-response";
import { CategoryResponse } from "@/types/category-response";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { FolderX, ImportIcon, Package } from "lucide-react";
import { Button } from "./ui/button";
import { ImportProductsModal } from "./import-products-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AddProductModal } from "./add-product-modal";
import { EditProductModal } from "./edit-product-modal";
import { DeleteProductDialog } from "./delete-product-dialog";
import { ExportButton } from "./export-button";

interface ProductListProps {
  productsPromise: Promise<ProductResponse>;
  categoriesPromise: Promise<CategoryResponse>;
}

export function ProductList({
  productsPromise,
  categoriesPromise,
}: ProductListProps) {
  const { page, totalPages, totalElements, products = [] } = use(productsPromise);
  const { categories = [] } = use(categoriesPromise);
  const [isImportProductModalOpen, setIsImportProductModalOpen] =
    useState<boolean>(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (totalElements === 0) {
    return (
      <>
        <Card className="mt-4">
          <CardContent className="py-12">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <FolderX className="h-10 w-10" />
                </EmptyMedia>
                <EmptyTitle>Nenhum produto encontrado</EmptyTitle>
                <EmptyDescription>
                  Adicione produtos manualmente ou importe de um arquivo .csv
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex flex-col sm:flex-row gap-2">
                  <AddProductModal categories={categories} />
                  <Button
                    variant={"outline"}
                    onClick={() => setIsImportProductModalOpen(true)}
                  >
                    <ImportIcon className="mr-2 h-4 w-4" />
                    Importar CSV
                  </Button>
                </div>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>

        <ImportProductsModal
          open={isImportProductModalOpen}
          onOpenChange={(open) => !open && setIsImportProductModalOpen(false)}
        />
      </>
    );
  }

  return (
    <section className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Catálogo de Produtos</CardTitle>
                <CardDescription>
                  {totalElements} produto{totalElements !== 1 ? "s" : ""}{" "}
                  cadastrado{totalElements !== 1 ? "s" : ""}
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ExportButton type="products" />
              <AddProductModal categories={categories} />
            </div>
          </div>

          {/* <ProductFilters categories={categories} /> */}
          {/* <Separator className="my-4" />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <SearchProduct />
          </div> */}
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/50">
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Descrição
                  </TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="hidden md:table-cell">Marca</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="w-24 text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="group transition-colors hover:bg-muted/50"
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      #{product.id.toString().padStart(3, "0")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-xs text-muted-foreground md:hidden">
                          {product.brand}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden max-w-xs lg:table-cell">
                      <span
                        className="line-clamp-2 text-sm text-muted-foreground"
                        title={product.description}
                      >
                        {product.description}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {product.category.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {product.brand}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatPrice(product.price)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <EditProductModal
                          product={product}
                          categories={categories}
                        />
                        <DeleteProductDialog product={product} />
                      </div>
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
            listLength={products.length}
          />
        </CardFooter>
      </Card>

      <ImportProductsModal
        open={isImportProductModalOpen}
        onOpenChange={(open) => !open && setIsImportProductModalOpen(false)}
      />
    </section>
  );
}