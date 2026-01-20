"use server";

import { BadRequestException } from "@/exceptions/bad-request-exception";
import { RequiredActionException } from "@/exceptions/required-action-exception";
import { importProductsService } from "@/services/products/import-products-service";
import { ActionType } from "@/types/action-type";
import z from "zod";

const importProductsSchema = z.object({
  file: z.instanceof(File, {error: "Arquivo inválido."})
    .refine(file => file.size > 0, "Arquivo inexistente.")
    .refine(file => file.size < 10 * 1024 * 1024, "Arquivo grande demais.")
    .refine(file => file.type === "text/csv" || file.name.endsWith(".csv"), "O arquivo deve ser \".csv\".")
})

export async function importProductsAction(_: unknown, formData: FormData): Promise<ActionType<FormData>> {
  console.log("FormData: ", formData);

  const schemaValidation = importProductsSchema.safeParse({ file: formData.get("file") });
  
  if (!schemaValidation.success) {
    return {
      status: "ERROR",
      message: "Erro de validação",
      payload: formData,
      errors: schemaValidation.error.issues,
      timestamp: Date.now()
    }
  }

  try {
    const response = await importProductsService(formData);

    if (response.ok) {
      return {
        status: "SUCCESS",
        message: "Produtos importados com sucesso!",
        payload: formData,
        timestamp: Date.now()
      }
    }

    return {
      status: "ERROR",
      message: "Não foi possível importar o arquivo!",
      payload: formData,
      timestamp: Date.now()
    }
  } catch (error) {
    if (error instanceof RequiredActionException && error.actions.includes("CATEGORY_IMPORT_REQUIRED")) {
      return {
        status: "ERROR",
        actions: error.actions,
        message: error.message,
        payload: formData,
        timestamp: Date.now()
      }
    }

    if (error instanceof BadRequestException) {
      return {
        status: "ERROR",
        message: error.description,
        payload: formData,
        timestamp: Date.now()
      }
    }

    return {
      status: "ERROR",
      message: "Erro desconhecido",
      payload: formData,
      timestamp: Date.now()
    }
  }
}