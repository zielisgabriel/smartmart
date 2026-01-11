from repositories.product_repository import ProductRepository
from decimal import Decimal


class CreateProductUsecase:
    def __init__(self):
        self.repository = ProductRepository()

    def execute(self, name: str, description: str, price: str, brand: str, category_id: int):
        return self.repository.create(
            name=name,
            description=description,
            price=Decimal(price),
            brand=brand,
            category_id=category_id
        )