import { useCallback, useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from "./ui/dialog"
import { ChartBarStackedIcon, CheckCircle2Icon, TagIcon, UploadIcon, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { importCategoriesService } from "@/services/categories/import-categories-service"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const fileFormSchema = z.object({
  categories: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "O arquivo é obrigatório.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Máximo de 10MB.")
    .refine((files) => files?.[0]?.name.endsWith(".csv"), "Apenas .csv permitido.")
});

type FileFormSchemaType = z.infer<typeof fileFormSchema>;

interface ImportCategoriesModalProps {
  open: boolean,
  onOpenChange: (open: boolean) => void
}

export function ImportCategoriesModal({ open, onOpenChange }: ImportCategoriesModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    reset,
    watch
  } = useForm({
    resolver: zodResolver(fileFormSchema)
  });
  const { isSubmitting } = formState;

  const files = watch("categories");
  const selectedFile = files?.item(0);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      setValue("categories", e.dataTransfer.files, { shouldValidate: true });
    }
  }

  async function onSubmit({ categories }: FileFormSchemaType) {
    const formData = new FormData();
    formData.append("file", categories[0]);
    
    try {
      await importCategoriesService(formData);

      toast.success("Categorias importadas com sucesso!");

      reset();
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao importar categorias");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <ChartBarStackedIcon className="h-12 w-12 rounded-xl p-2 text-white bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/25" />
            <div>
              <DialogTitle className="text-xl font-semibold">Importar Categorias</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Faça upload de um arquivo CSV para importar suas categorias
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
                  ? "border-violet-500 bg-violet-500/5"
                  : selectedFile
                  ? "border-violet-500 bg-violet-500/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50"
              }`}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10">
                    <CheckCircle2Icon className="h-8 w-8 text-violet-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => reset({ categories: undefined })}
                    className="text-muted-foreground hover:text-foreground"
                  >
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
                    type="file"
                    accept=".csv"
                    {...register("categories")}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </>
              )}
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-start gap-2">
                <TagIcon className="text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Formato esperado</p>
                  <p className="text-xs text-muted-foreground">
                    O arquivo deve conter as colunas: id, name
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button
              disabled={!selectedFile || isSubmitting}
              className="bg-violet-600 hover:bg-violet-700"
              type="submit"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadIcon className="h-4 w-4" />}
              Importar Categorias
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}