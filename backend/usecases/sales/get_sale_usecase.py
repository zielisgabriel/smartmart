from repositories.sale_repository import SaleRepository


class GetSaleUsecase:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self, sale_id):
        return self.repository.find_by_id(sale_id)
