from repositories.sale_repository import SaleRepository


class ListSales:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self, page=1, size=10):
        sales, total = self.repository.find_all(page=page, size=size)
        return {
            "sales": [sale.to_dict() for sale in sales],
            "totalElements": total,
            "page": page,
            "size": size,
            "totalPages": (total + size - 1) // size,
        }

class GetSale:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self, sale_id):
        sale = self.repository.find_by_id(sale_id)
        if not sale:
            return None
        return sale.to_dict()

class CreateSale:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self, product_id, quantity, total_price, date):
        sale = self.repository.create(product_id, quantity, total_price, date)
        return sale.to_dict()

class DeleteSale:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self, sale_id):
        return self.repository.delete(sale_id)

class GetSalesStats:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self):
        return self.repository.get_stats()
