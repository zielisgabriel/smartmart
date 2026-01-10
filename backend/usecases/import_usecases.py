import csv
from io import StringIO
from datetime import datetime
from repositories.category_repository import CategoryRepository
from repositories.product_repository import ProductRepository
from repositories.sale_repository import SaleRepository


class ImportCategories:
    def __init__(self):
        self.repository = CategoryRepository()

    def execute(self, file_content):
        reader = csv.DictReader(StringIO(file_content))

        if reader.fieldnames is None or "name" not in reader.fieldnames:
            raise ValueError("Coluna 'name' é obrigatória")

        categories_data = [{"name": row["name"]} for row in reader]
        created = self.repository.bulk_create(categories_data)
        return len(created)


class ImportProducts:
    def __init__(self):
        self.repository = ProductRepository()

    def execute(self, file_content):
        reader = csv.DictReader(StringIO(file_content))

        required_columns = ["name", "description", "price", "brand", "category_id"]
        if reader.fieldnames is None:
            raise ValueError("Arquivo CSV inválido")
        for col in required_columns:
            if col not in reader.fieldnames:
                raise ValueError(f"Coluna '{col}' é obrigatória")

        products_data = []
        for row in reader:
            products_data.append({
                "name": row["name"],
                "description": row["description"],
                "price": float(row["price"]),
                "brand": row["brand"],
                "category_id": int(row["category_id"]),
            })

        created = self.repository.bulk_create(products_data)
        return len(created)


class ImportSales:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self, file_content):
        reader = csv.DictReader(StringIO(file_content))

        required_columns = ["product_id", "quantity", "total_price", "date"]
        if reader.fieldnames is None:
            raise ValueError("Arquivo CSV inválido")
        for col in required_columns:
            if col not in reader.fieldnames:
                raise ValueError(f"Coluna '{col}' é obrigatória")

        sales_data = []
        for row in reader:
            sales_data.append({
                "product_id": int(row["product_id"]),
                "quantity": int(row["quantity"]),
                "total_price": float(row["total_price"]),
                "date": datetime.fromisoformat(row["date"]),
            })

        created = self.repository.bulk_create(sales_data)
        return len(created)
