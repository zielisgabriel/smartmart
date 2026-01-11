from repositories.sale_repository import SaleRepository


class GetSalesStatsUsecase:
    def __init__(self):
        self.repository = SaleRepository()

    def execute(self):
        return self.repository.get_stats()
