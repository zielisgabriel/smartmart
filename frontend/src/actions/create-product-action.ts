"use server";

import { BadRequestException } from "@/exceptions/bad-request-exception";
import { createProductService } from "@/services/products/create-product-service";
import { ActionType } from "@/types/action-type";
import z from "zod";

const productSchema = z.object({
  name: z
    .string()
    .min(3, {error: "Nome deve ter pelo menos 3 caracteres"})
    .max(100, {error: "Nome deve ter no máximo 100 caracteres"}),
  description: z
    .string()
    .min(10, {error: "Descrição deve ter pelo menos 10 caracteres"})
    .max(500, {error: "Descrição deve ter no máximo 500 caracteres"}),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      error: "Preço deve ser um número positivo",
    }),
  category_id: z.string().min(1, {error: "Selecione uma categoria"}),
  brand: z
    .string()
    .min(2, {error: "Marca deve ter pelo menos 2 caracteres"})
    .max(50, {error: "Marca deve ter no máximo 50 caracteres"}),
});

export async function createProductAction(_: unknown, formData: FormData): Promise<ActionType<FormData>> {  
  const result = productSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    category_id: formData.get("category_id") as string,
    brand: formData.get("brand") as string
  });

  if (!result.success) {
    console.log("createProductAction | Error Issues:", z.treeifyError(result.error).properties);

    return {
      status: "ERROR",
      message: "Erro de validação",
      errors: z.treeifyError(result.error).properties,
      timestamp: Date.now(),
      payload: formData
    }
  }

  const { data } = result;

  try {
    await createProductService({
      name: data.name,
      description: data.description,
      brand: data.brand,
      category_id: Number(data.category_id),
      price: Number(data.price)
    });

    return {
      status: "SUCCESS",
      message: "Produto criado com sucesso!",
      payload: formData,
      timestamp: Date.now()
    }
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return {
        status: "ERROR",
        message: error.description,
        timestamp: Date.now(),
        payload: formData
      }
    }

    return {
      status: "ERROR",
      message: "Erro desconhecido",
      timestamp: Date.now(),
      payload: formData
    }
  }
}