"use client"

import { useState } from "react"
import { Trash2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Product } from "@/types/product"
import { Spinner } from "./ui/spinner"
import { deleteProductService } from "@/services/delete-product-service"

interface DeleteProductDialogProps {
  product: Product;
  onProductDeleted?: () => void
}

export function DeleteProductDialog({
  product,
  onProductDeleted,
}: DeleteProductDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      await deleteProductService(product.id);

      toast.success("Produto removido com sucesso!", {
        description: `${product.name} foi removido do catálogo.`,
      });

      setDialogOpen(false);
      onProductDeleted?.();
    } catch (error) {
      toast.error("Erro ao excluir produto", {
        description: error instanceof Error ? error.message : "Tente novamente.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Excluir produto</span>
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir produto</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-2">
            Você está prestes a excluir o produto{" "}
            <span className="font-semibold text-foreground">
              &quot;{product.name}&quot;
            </span>
            . Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="rounded-lg border bg-muted/50 p-3 my-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Marca:</span>{" "}
              <span className="font-medium">{product.brand}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Preço:</span>{" "}
              <span className="font-medium">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/80"
            asChild
          >
            <Button variant={"destructive"}>
              {isDeleting ? (
                <>
                  <Spinner />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Excluir Produto
                </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
