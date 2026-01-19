"use server";

import { RequiredActionException } from "@/exceptions/required-action-exception";
import { fetchClient } from "@/lib/fetch-client";
import { ActionType } from "@/types/action-type";
import { revalidateTag } from "next/cache";

export async function importProductsService(_prevState: ActionType, formData: FormData): Promise<ActionType> {
  try {
    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return {
        status: "ERROR",
        message: "Arquivo inválido ou não enviado.",
        timestamp: Date.now()
      }
    }

    await fetchClient({
      path: "/api/import/products",
      init: {
        method: "POST",
        body: formData
      },
    });

    revalidateTag("products", { expire: 0 });

    return {
      status: "SUCCESS",
      message: "Produtos importados com sucesso!",
      timestamp: Date.now()
    }
  } catch (error) {
    if (error instanceof RequiredActionException) {
      const actions = error.actions

      return {
        status: "ERROR",
        message: error.description,
        actions: actions,
        timestamp: Date.now()
      }
    }

    return {
      status: "ERROR",
      message: "Erro interno ao processar importação",
      timestamp: Date.now()
    }
  }
}