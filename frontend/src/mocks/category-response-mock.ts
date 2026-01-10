import { CategoryResponse } from "@/types/category-response";

export async function categoryResponseMock(): Promise<CategoryResponse> {
  return mock;
}

const mock: CategoryResponse = {
  categories: [
    {
      id: 1,
      name: "Grãos e Cereais"
    },
    {
      id: 2,
      name: "Café e Açúcar"
    },
    {
      id: 3,
      name: "Laticínios"
    },
    {
      id: 4,
      name: "Padaria"
    },
    {
      id: 5,
      name: "Limpeza"
    },
    {
      id: 6,
      name: "Higiene"
    },
    {
      id: 7,
      name: "Papelaria"
    },
    {
      id: 8,
      name: "Bebidas"
    },
    {
      id: 9,
      name: "Doces"
    },
    {
      id: 10,
      name: "Snacks"
    }
  ]
}
