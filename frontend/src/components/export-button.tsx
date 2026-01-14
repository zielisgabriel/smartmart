"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { exportProductsService } from "@/services/products/export-products-service";
import { exportSalesService } from "@/services/sales/export-sales-service";
import { exportCategoriesService } from "@/services/categories/export-categories-service";

type ExportType = "products" | "sales" | "categories";

interface ExportButtonProps {
  type?: ExportType;
  showDropdown?: boolean;
}

export function ExportButton({ type, showDropdown = false }: ExportButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<ExportType | null>(null);

  const handleExport = async (exportType: ExportType) => {
    setIsLoading(true);
    setLoadingType(exportType);

    try {
      switch (exportType) {
        case "products":
          const productsCsv = await exportProductsService();

          const productsBlob = new Blob([productsCsv], { type: "text/csv" });
          const productsUrl = window.URL.createObjectURL(productsBlob);
          const productsLink = document.createElement("a");
          productsLink.href = productsUrl;
          productsLink.download = "products.csv";
          document.body.appendChild(productsLink);
          productsLink.click();
          document.body.removeChild(productsLink);
          window.URL.revokeObjectURL(productsUrl);

          toast.success("Produtos exportados com sucesso!");
          break;
        case "sales":
          const salesCsv = await exportSalesService();

          const salesBlob = new Blob([salesCsv], { type: "text/csv" });
          const salesUrl = window.URL.createObjectURL(salesBlob);
          const salesLink = document.createElement("a");
          salesLink.href = salesUrl;
          salesLink.download = "sales.csv";
          document.body.appendChild(salesLink);
          salesLink.click();
          document.body.removeChild(salesLink);
          window.URL.revokeObjectURL(salesUrl);

          toast.success("Vendas exportadas com sucesso!");
          break;
        case "categories":
          const categoriesCsv = await exportCategoriesService();

          const categoriesBlob = new Blob([categoriesCsv], { type: "text/csv" });
          const categoriesUrl = window.URL.createObjectURL(categoriesBlob);
          const categoriesLink = document.createElement("a");
          categoriesLink.href = categoriesUrl;
          categoriesLink.download = "categories.csv";
          document.body.appendChild(categoriesLink);
          categoriesLink.click();
          document.body.removeChild(categoriesLink);
          window.URL.revokeObjectURL(categoriesUrl);

          toast.success("Categorias exportadas com sucesso!");
          break;
      }
    } catch (error) {
      toast.error("Erro ao exportar dados");
      console.error(error);
    } finally {
      setIsLoading(false);
      setLoadingType(null);
    }
  };

  if (showDropdown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Exportar CSV
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => handleExport("products")}
            disabled={isLoading}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar Produtos
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleExport("sales")}
            disabled={isLoading}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar Vendas
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleExport("categories")}
            disabled={isLoading}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar Categorias
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const getLabel = () => {
    switch (type) {
      case "products":
        return "Exportar Produtos";
      case "sales":
        return "Exportar Vendas";
      case "categories":
        return "Exportar Categorias";
      default:
        return "Exportar CSV";
    }
  };

  return (
    <Button
      variant="outline"
      onClick={() => type && handleExport(type)}
      disabled={isLoading || !type}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {getLabel()}
    </Button>
  );
}
