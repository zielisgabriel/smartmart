import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from "./ui/dialog"
import { CheckCircle2Icon, FileSpreadsheetIcon, ShoppingBasketIcon, Trash2Icon, UploadIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Spinner } from "./ui/spinner"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { importProducts } from "@/actions/import-actions"

const MAX_FILE_SIZE = 10 * 1024 * 1024

const fileFormSchema = z.object({
  products: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "O arquivo é obrigatório.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Máximo de 10MB.")
    .refine((files) => files?.[0]?.name.endsWith(".csv"), "Apenas .csv permitido.")
});

type FileFormSchemaType = z.infer<typeof fileFormSchema>;

interface ImportProductsModalProps {
  open: boolean,
  onOpenChange: (open:boolean) => void
}

export function ImportProductsModal({ open, onOpenChange }: ImportProductsModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState
  } = useForm({
    resolver: zodResolver(fileFormSchema)
  });
  const {
    isSubmitting
  } = formState;

  const files = watch("products");
  const selectedFile = files?.item(0);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer?.files) {
      setValue("products", e.dataTransfer.files, { shouldValidate: true });
    }
  }

  async function onSubmit({ products }: FileFormSchemaType) {
    const formData = new FormData();
    formData.append("file", products[0]);

    try {
      const result = await importProducts(formData);

      toast.success("Produtos importados com sucesso!");

      reset()
      onOpenChange(false)
    } catch (error) {
      toast.error("Erro ao importar produtos", {
        description: error instanceof Error ? error.message : "Verifique o formato do arquivo.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25">
              <ShoppingBasketIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">Importar Produtos</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Faça upload de um arquivo CSV para importar seus produtos
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 py-4">
            <div
              onDragOver={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200 ${
                isDragging
                  ? "border-emerald-500 bg-emerald-500/5"
                  : selectedFile
                  ? "border-emerald-500 bg-emerald-500/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50"
              }`}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2Icon className="h-8 w-8 text-emerald-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => reset({ products: undefined })}>
                    <Trash2Icon />
                    Remover arquivo
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <UploadIcon className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-medium text-foreground">Arraste seu arquivo CSV aqui</p>
                    <p className="mt-1 text-sm text-muted-foreground">ou clique para selecionar</p>
                  </div>
                  <input
                    {...register("products")}
                    type="file"
                    accept=".csv"
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </>
              )}
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-start gap-3">
                <FileSpreadsheetIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Formato esperado</p>
                  <p className="text-xs text-muted-foreground">
                    O arquivo deve conter as colunas: id, name, description, price, category_id, brand
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              disabled={!selectedFile || isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700"
              type="submit"
            >
              {isSubmitting ? <Spinner /> : <UploadIcon className="h-4 w-4" />}
              Importar Produtos
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}