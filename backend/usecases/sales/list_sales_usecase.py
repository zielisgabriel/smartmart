from repositories.sale_repository import SaleRepository


class ListSalesUsecase:
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
