import { useCallback, useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from "./ui/dialog"
import { CheckCircle2Icon, HistoryIcon, TagIcon, UploadIcon, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { importSalesService } from "@/services/sales/import-sales-service"

export function ImportSalesHistoryModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.name.endsWith(".csv")) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }, [])

  const handleSubmit = async () => {
    if (!file) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await importSalesService(formData);

      toast.success("Vendas importadas com sucesso!");

      setFile(null);
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao importar vendas");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
              <HistoryIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">Histórico de Vendas</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Importe o histórico de vendas
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div
            onDragOver={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200 ${
              isDragging
                ? "border-amber-500 bg-amber-500/5"
                : file
                ? "border-amber-500 bg-amber-500/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50"
            }`}
          >
            {file ? (
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10">
                  <CheckCircle2Icon className="h-8 w-8 text-violet-500" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="text-muted-foreground hover:text-foreground">
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
                  onChange={handleFileChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </>
            )}
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <TagIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Formato esperado</p>
                <p className="text-xs text-muted-foreground">
                  O arquivo deve conter as colunas: id, product_id, quantity, total_price, date
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Fechar
          </Button>
          <Button 
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            disabled={!file || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadIcon className="mr-2 h-4 w-4" />}
            Importar Vendas
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}