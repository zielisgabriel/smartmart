import { CircleXIcon, ImportIcon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { ImportCategoriesModal } from "./import-categories-modal";
import { useState } from "react";

interface ImportCategoriesAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void,
}

export function ImportCategoriesAlert({ open, onOpenChange }: ImportCategoriesAlertProps) {
  const [isImportCategoriesModalOpen, setIsImportCategoriesModalOpen] = useState<boolean>(false);
  
  return (
    <>
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex flex-col items-center gap-2">
              <CircleXIcon className="h-12 w-12 text-white bg-red-500 rounded-xl p-2" />
              É necessário importar as categorias primeiro antes de importar os produtos!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Importe as categorias no botão abaixo
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setIsImportCategoriesModalOpen(true)}
            >
              <ImportIcon />
              Importar categorias
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ImportCategoriesModal
        open={isImportCategoriesModalOpen}
        onOpenChange={open => !open && setIsImportCategoriesModalOpen(false)}
      />
    </>
  );
}