const API_URL = "http://localhost:5000";

export async function exportProductsService(): Promise<void> {
  const response = await fetch(`${API_URL}/api/export/products`);
  
  if (!response.ok) {
    throw new Error("Falha ao exportar produtos");
  }
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "products.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export async function exportSalesService(): Promise<void> {
  const response = await fetch(`${API_URL}/api/export/sales`);
  
  if (!response.ok) {
    throw new Error("Falha ao exportar vendas");
  }
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sales.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export async function exportCategoriesService(): Promise<void> {
  const response = await fetch(`${API_URL}/api/export/categories`);
  
  if (!response.ok) {
    throw new Error("Falha ao exportar categorias");
  }
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "categories.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
