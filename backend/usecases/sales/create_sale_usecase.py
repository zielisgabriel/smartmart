from repositories.sale_repository import SaleRepository
from datetime import datetime
from decimal import Decimal


class CreateSaleUsecase:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self, product_id: int, quantity: int, total_price: Decimal, date: datetime):
        return self.repository.create(product_id, quantity, total_price, date)
