"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Pencil, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { updateProduct } from "@/actions/product-actions"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Category } from "@/types/category"
import { Product } from "@/types/product"

const productSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Preço deve ser um número positivo",
    }),
  category_id: z.string().min(1, "Selecione uma categoria"),
  brand: z
    .string()
    .min(2, "Marca deve ter pelo menos 2 caracteres")
    .max(50, "Marca deve ter no máximo 50 caracteres"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface EditProductModalProps {
  product: Product;
  categories: Category[];
  onProductUpdated?: () => void;
}

export function EditProductModal({
  product,
  categories,
  onProductUpdated,
}: EditProductModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: String(product.price),
      category_id: String(product.category.id),
      brand: product.brand,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: product.name,
        description: product.description,
        price: String(product.price),
        category_id: String(product.category.id),
        brand: product.brand,
      });
    }
  }, [open, product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)

    try {
      await updateProduct({
        id: product.id,
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        category_id: parseInt(data.category_id),
        brand: data.brand,
      })

      toast.success("Produto atualizado com sucesso!", {
        description: `${data.name} foi atualizado.`,
      })

      setOpen(false)
      onProductUpdated?.()
    } catch (error) {
      toast.error("Erro ao atualizar produto", {
        description: error instanceof Error ? error.message : "Tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Editar produto</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar produto</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Atualize as informações do produto abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome do Produto *</Label>
            <Input
              id="edit-name"
              placeholder="Ex: Arroz Branco Tipo 1"
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Descrição *</Label>
            <Textarea
              id="edit-description"
              placeholder="Descreva o produto detalhadamente..."
              rows={3}
              {...register("description")}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-price">Preço (R$) *</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("price")}
                className={errors.price ? "border-destructive" : ""}
              />
              {errors.price && (
                <p className="text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-brand">Marca *</Label>
              <Input
                id="edit-brand"
                placeholder="Ex: Tio João"
                {...register("brand")}
                className={errors.brand ? "border-destructive" : ""}
              />
              {errors.brand && (
                <p className="text-sm text-destructive">
                  {errors.brand.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category">Categoria *</Label>
            <Select
              defaultValue={String(product.category.id)}
              onValueChange={(value) => setValue("category_id", value, { shouldDirty: true })}
            >
              <SelectTrigger
                className={errors.category_id ? "border-destructive" : ""}
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
            {errors.category_id && (
              <p className="text-sm text-destructive">
                {errors.category_id.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
