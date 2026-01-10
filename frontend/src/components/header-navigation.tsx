"use client";

import { useState } from "react";
import { ChartBarStackedIcon, FileDownIcon, HistoryIcon, ShoppingBasketIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImportProductsModal } from "./import-products-modal";
import { ImportCategoriesModal } from "./import-categories-modal";
import { ImportSalesHistoryModal } from "./import-sales-history-modal";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from "./ui/dropdown-menu";

type ModalType = "products" | "categories" | "history" | null;

export function HeaderNavigation() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (modal: ModalType) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"sm"}>
              <FileDownIcon size={14} />
              Importar
              <Badge className="text-[10px] font-bold bg-green-800">
                CSV
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              Importar
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="w-full justify-start"
              onClick={() => openModal("products")}
            >
              <ShoppingBasketIcon className="h-4 w-4" />
              Lista de produtos
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full"
              onClick={() => openModal("categories")}
            >
              <ChartBarStackedIcon className="h-4 w-4" />
              Categorias
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full justify-start"
              onClick={() => openModal("history")}
            >
                <HistoryIcon className="h-4 w-4" />
                Histórico de vendas
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <ImportProductsModal open={activeModal === "products"} onOpenChange={(open) => !open && closeModal()} />
      <ImportCategoriesModal open={activeModal === "categories"} onOpenChange={(open) => !open && closeModal()} />
      <ImportSalesHistoryModal open={activeModal === "history"} onOpenChange={(open) => !open && closeModal()} />
    </>
  );
}