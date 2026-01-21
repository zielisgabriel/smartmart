import { useActionState, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from "./ui/dialog"
import { CheckCircle2Icon, ShoppingBasketIcon, TagIcon, Trash2Icon, UploadIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"
import { ImportCategoriesAlert } from "./import-categories-alert"
import { importProductsAction } from "@/actions/import-products-action"
import { toast } from "sonner"
import { ImportCategoriesModal } from "./import-categories-modal"

interface ImportProductsModalProps {
  open: boolean,
  onOpenChange: (open:boolean) => void
}

export function ImportProductsModal({ open, onOpenChange }: ImportProductsModalProps) {
  const [state, formAction, pending] = useActionState(importProductsAction, null);
  const [isImportCategoriesAlertOpen, setIsImportCategoriesAlertOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files.item(0);
    if (droppedFile) {
      setSelectedFile(droppedFile);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.item(0);
    if (file) {
      setSelectedFile(file);
    }
  }

  useEffect(() => {
    if (!state) return;

    if (state.status === "SUCCESS") {
      toast.success(state.message);
      onOpenChange(false);
      setSelectedFile(null);
    } else if (state.status === "ERROR") {
      if (state.actions?.includes("CATEGORY_IMPORT_REQUIRED")) {
        setIsImportCategoriesAlertOpen(true);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
                <ShoppingBasketIcon className="h-12 w-12 rounded-xl p-2 text-white bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25" />
              <div>
                <DialogTitle className="text-xl font-semibold">Importar Produtos</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Faça upload de um arquivo CSV para importar seus produtos
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form action={(formData) => {
            if (selectedFile) {
              formData.set("file", selectedFile);
            }
            formAction(formData);
          }}>
            <div className="space-y-6 py-4">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
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
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
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
                      type="file"
                      name="file"
                      accept=".csv"
                      onChange={handleFileChange}
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
                      O arquivo deve conter as colunas: id, name, description, price, category_id, brand
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                disabled={!selectedFile || pending}
                className="bg-emerald-600 hover:bg-emerald-700"
                type="submit"
              >
                {pending ? <Spinner /> : <UploadIcon className="h-4 w-4" />}
                Importar Produtos
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ImportCategoriesAlert
        open={isImportCategoriesAlertOpen}
        onOpenChange={open => !open && setIsImportCategoriesAlertOpen(false)}
      />
    </>
  );
}