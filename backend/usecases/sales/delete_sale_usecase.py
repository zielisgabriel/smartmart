from repositories.sale_repository import SaleRepository


class DeleteSaleUsecase:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self, sale_id):
        return self.repository.delete(sale_id)
