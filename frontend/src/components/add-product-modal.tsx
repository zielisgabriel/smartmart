"use client"

import { useActionState, useEffect, useState } from "react"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/category";
import { createProductAction } from "@/actions/create-product-action"

interface AddProductModalProps {
  categories: Category[];
  onProductAdded?: () => void;
}

export function AddProductModal({
  categories,
  onProductAdded,
}: AddProductModalProps) {
  const [state, formAction, pending] = useActionState(createProductAction, null);
  const [open, setOpen] = useState(false);

  const fieldErrors = state?.errors?.reduce((acc: Record<string, string>, issue: any) => {
    if (issue.path?.[0]) {
      acc[issue.path[0]] = issue.message;
    }
    return acc;
  }, {} as Record<string, string>) ?? {};

  const getFieldValue = (field: string) => state?.payload?.get(field)?.toString() ?? "";

  useEffect(() => {
    if (!state) return;

    if (state.status === "SUCCESS") {
      toast.success(state.message);
      setOpen(false);
      onProductAdded?.();
    } else if (state.status === "ERROR" && !state.errors) {
      toast.error(state.message);
    }
  }, [state, onProductAdded]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para adicionar um novo produto ao
            catálogo.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4" key={state?.timestamp}>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto *</Label>
            <Input
              id="name"
              placeholder="Ex: Arroz Branco Tipo 1"
              name="name"
              defaultValue={getFieldValue("name")}
              className={fieldErrors.name ? "border-destructive" : ""}
            />
            {fieldErrors.name && (
              <p className="text-sm text-destructive">{fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              placeholder="Descreva o produto detalhadamente..."
              rows={3}
              name="description"
              defaultValue={getFieldValue("description")}
              className={fieldErrors.description ? "border-destructive" : ""}
            />
            {fieldErrors.description && (
              <p className="text-sm text-destructive">
                {fieldErrors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                name="price"
                defaultValue={getFieldValue("price")}
                className={fieldErrors.price ? "border-destructive" : ""}
              />
              {fieldErrors.price && (
                <p className="text-sm text-destructive">
                  {fieldErrors.price}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Marca *</Label>
              <Input
                id="brand"
                placeholder="Ex: Tio João"
                name="brand"
                defaultValue={getFieldValue("brand")}
                className={fieldErrors.brand ? "border-destructive" : ""}
              />
              {fieldErrors.brand && (
                <p className="text-sm text-destructive">
                  {fieldErrors.brand}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <Select
              name="category_id"
              defaultValue={getFieldValue("category_id")}
              disabled={categories.length == 0}
            >
              <SelectTrigger
                className={fieldErrors.category_id ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.category_id && (
              <p className="text-sm text-destructive">
                {fieldErrors.category_id}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>

            <Button type="submit" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Produto"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
