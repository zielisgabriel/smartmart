from repositories.product_repository import ProductRepository
import csv
from io import StringIO


class ExportProductsUsecase:
    def __init__(self):
        self.repository = ProductRepository()

    def execute(self):
        products, _ = self.repository.find_all(page=1, size=10000)
        
        output = StringIO()
        writer = csv.writer(output)
        
        writer.writerow(["id", "name", "description", "price", "brand", "category_id"])
        
        for product in products:
            writer.writerow([
                product.id,
                product.name,
                product.description,
                float(product.price),
                product.brand,
                product.category_id
            ])
        
        return output.getvalue()
