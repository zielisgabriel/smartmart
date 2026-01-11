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
import {
  exportProductsService,
  exportSalesService,
  exportCategoriesService,
} from "@/services/export-service";
import { toast } from "sonner";

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
          await exportProductsService();
          toast.success("Produtos exportados com sucesso!");
          break;
        case "sales":
          await exportSalesService();
          toast.success("Vendas exportadas com sucesso!");
          break;
        case "categories":
          await exportCategoriesService();
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
